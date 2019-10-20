import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(private readonly entityManager: EntityManager) {}

  async getLocations(): Promise<string> {
    const rawData = await this.entityManager.query(
      `SELECT country.title as country, location.title as location, location.id FROM country, location  WHERE country.id=location.country_id order by country.title`,
    );
    Logger.log('Locations list request');
    return rawData;
  }
}
