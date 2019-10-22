import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
  CheckAvailabilityDto,
  CheckAvailabilityRO,
} from './dto/check-availability.dto';
import { Offer } from './offer.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getAvaliableOffers(
    params: CheckAvailabilityDto,
  ): Promise<CheckAvailabilityRO[]> {
    const { locationId, dateStart, dateEnd } = params;
    let res = await this.entityManager
      .createQueryBuilder()
      .select('offer.id', 'id')
      .addSelect('offer.offer_type', 'offer_type')
      .addSelect('offer.qty - count(booking.offer_id)', 'available')
      .from(Offer, 'offer')
      .leftJoin(
        'booking',
        'booking',
        'booking.offer_id = offer.id and booking.start_date < :dateEnd and booking.end_date > :dateStart',
        { dateEnd, dateStart },
      )
      .where('offer.location_id = :locationId', { locationId })
      .groupBy('offer.id')
      .addGroupBy('offer.offer_type')
      .having('offer.qty - count(booking.offer_id) > 0')
      .getRawMany();
    //Forcing "available" field conversion from string to number (see bug https://github.com/typeorm/typeorm/issues/2708)
    return res.map(
      item => new CheckAvailabilityRO(item.id, item.offer_type, +item.available),
    );
  }
}
