import { Controller, Get, HttpStatus } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './location.entity';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiOkResponse({ description: 'Get locations list', type: [Location] })
  async listLocations(): Promise<Location[]> {
    return await this.locationsService.getLocations();
  }
}
