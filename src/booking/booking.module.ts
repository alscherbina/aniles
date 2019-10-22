import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
