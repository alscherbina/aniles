import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { ValidationPipe } from './../shared/pipes/validation.pipe';

@Controller('booking')
export class BookingController {
  @Get('availability')
  @UsePipes(new ValidationPipe())
  async checkAvailability(@Query() availabilityParams: CheckAvailabilityDto): Promise<any> {
    return availabilityParams;
  }
}
