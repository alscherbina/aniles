import * as dotenv from 'dotenv-safe';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsModule } from './locations/locations.module';
import { Location } from './locations/location.entity';
import { Country } from './locations/country.entity';
import { BookingModule } from './booking/booking.module';
import { Offer } from './booking/offer.entity';
import { Booking } from './booking/booking.entity';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.PG_URI,
      logging: process.env.NODE_ENV === 'development',
      extra: {
        max: process.env.PG_POOL_SIZE || 2,
        connectionTimeoutMillis: process.env.PG_CONNECTION_TIMEOUT || 0,
      },
      entities: [Location, Country, Offer, Booking],
    }),
    LocationsModule,
    BookingModule,
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
