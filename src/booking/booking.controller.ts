import { Controller, Get, Query, UsePipes, Post, Body, HttpException } from '@nestjs/common';
import {
  CheckAvailabilityDto,
  CheckAvailabilityRO,
} from './dto/check-availability.dto';
import { ValidationPipe } from './../shared/pipes/validation.pipe';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './booking.entity';
import { ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('availability')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ description: 'List available offers for specific location and period', type: [CheckAvailabilityRO] })
  async checkAvailability(
    @Query() availabilityParams: CheckAvailabilityDto,
  ): Promise<CheckAvailabilityRO[]> {
    return await this.bookingService.getAvaliableOffers(availabilityParams);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ description: 'Created booking data', type: Booking })
  @ApiBadRequestResponse({ description: 'Offer is not available or input data validation failed', type: HttpException })
  async bookOffer(@Body() bookingParams: CreateBookingDto): Promise<Booking> {
    return await this.bookingService.bookOffer(bookingParams);
  }
}
