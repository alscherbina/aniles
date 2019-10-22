import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { ValidationPipe } from './../shared/pipes/validation.pipe';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('availability')
  @UsePipes(new ValidationPipe())
  async checkAvailability(@Query() availabilityParams: CheckAvailabilityDto): Promise<any> {
    return this.bookingService.getAvaliableOffers(availabilityParams);
  }
}
