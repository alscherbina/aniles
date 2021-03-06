import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  CheckAvailabilityDto,
  CheckAvailabilityRO,
} from './dto/check-availability.dto';
import { Offer } from './offer.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async getAvaliableOffers(
    params: CheckAvailabilityDto,
  ): Promise<CheckAvailabilityRO[]> {
    const { locationId, startDate, endDate } = params;
    const res = await this.entityManager
      .createQueryBuilder()
      .select('offer.id', 'id')
      .addSelect('offer.offer_type', 'offerType')
      .addSelect('offer.price', 'price')
      .addSelect('offer.qty - count(booking.offer_id)', 'available')
      .from(Offer, 'offer')
      .leftJoin(
        'booking',
        'booking',
        'booking.offer_id = offer.id and booking.start_date < :endDate and booking.end_date > :startDate',
        { endDate, startDate },
      )
      .where('offer.location_id = :locationId', { locationId })
      .groupBy('offer.id')
      .addGroupBy('offer.offer_type')
      .having('offer.qty - count(booking.offer_id) > 0')
      .getRawMany();
    // Forcing "available" field conversion from string to number (see bug https://github.com/typeorm/typeorm/issues/2708)
    return res.map(
      item => new CheckAvailabilityRO(item.id, item.offerType, item.price, +item.available),
    );
  }

  async bookOffer(bookingParams: CreateBookingDto): Promise<Booking> {
    const { offerId, startDate, endDate } = bookingParams;
    let res;
    // Preventing double booking with pessimistic lock on offer
    await this.entityManager.transaction(async transactionalEntityManager => {
      // Lock offer record
      await this.lockOffer(transactionalEntityManager, offerId);
      // Ensure offer is still available
      await this.ensureOfferAvailability(
        transactionalEntityManager,
        endDate,
        startDate,
        offerId,
      );
      // Book offer
      const booking = this.bookingRepository.create(bookingParams);
      res = await transactionalEntityManager.save(booking);
    });
    return res;
  }

  private async ensureOfferAvailability(
    transactionalEntityManager: EntityManager,
    dateEnd: Date,
    dateStart: Date,
    offerId: string,
  ) {
    const availableQty = await transactionalEntityManager
      .createQueryBuilder()
      .select('offer.id', 'id')
      .addSelect('offer.qty - count(booking.offer_id)', 'available')
      .from(Offer, 'offer')
      .leftJoin(
        'booking',
        'booking',
        'booking.offer_id = offer.id and booking.start_date < :dateEnd and booking.end_date > :dateStart',
        { dateEnd, dateStart },
      )
      .where('offer.id = :offerId', { offerId })
      .groupBy('offer.id')
      .addGroupBy('offer.qty')
      .having('offer.qty - count(booking.offer_id) > 0')
      .getRawOne();
    if (!availableQty) {
      throw new HttpException(
        'Sorry! This room is no longer available .',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async lockOffer(
    transactionalEntityManager: EntityManager,
    offerId: string,
  ) {
    const offerRecord = await transactionalEntityManager
      .createQueryBuilder()
      .select()
      .from(Offer, 'offer')
      .where('offer.id = :offerId', { offerId })
      .setLock('pessimistic_write')
      .getRawOne();
    if (!offerRecord) {
      throw new HttpException(
        `Sorry! Offer id #${offerId} doesn't exist .`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
