import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationsService {
  getLocations(): string {
    return 'Locations list';
  }
}
