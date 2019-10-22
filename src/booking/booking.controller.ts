import { Controller, Get, Query, UsePipes, Post, Body } from '@nestjs/common';
import { CheckAvailabilityDto, CheckAvailabilityRO } from './dto/check-availability.dto';
import { ValidationPipe } from './../shared/pipes/validation.pipe';
import { BookingService } from './booking.service';
import { CreateBookingDto, CreateBookingRO } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('availability')
  @UsePipes(new ValidationPipe())
  async checkAvailability(@Query() availabilityParams: CheckAvailabilityDto): Promise<CheckAvailabilityRO[]> {
    return this.bookingService.getAvaliableOffers(availabilityParams);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async bookOffer(@Body() bookingParams: CreateBookingDto): Promise<CreateBookingRO> {
      return await this.bookingService.bookOffer(bookingParams);
  }
}
