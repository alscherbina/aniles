import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CheckAvailabilityDto } from './dto/check-availability.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getAvaliableOffers(params: CheckAvailabilityDto): Promise<any> {
    return params;
  }

}
