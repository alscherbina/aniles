import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getLocations(): Promise<Location[]> {
    Logger.log('Locations list request');
    const locations: Location[] = await this.locationRepository.find();
    return locations;
  }
}
