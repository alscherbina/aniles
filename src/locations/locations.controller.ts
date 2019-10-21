import { Controller, Get } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './location.entity';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async listLocations(): Promise<Location[]> {
    return await this.locationsService.getLocations();
  }
}
