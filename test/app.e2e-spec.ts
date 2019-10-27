import * as fs from 'fs';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { getRepositoryToken, TypeOrmModule, getEntityManagerToken } from '@nestjs/typeorm';
import { BookingService } from './../src/booking/booking.service';
import { BookingController } from './../src/booking/booking.controller';
import { Booking } from './../src/booking/booking.entity';
import { LocationsModule } from './../src/locations/locations.module';
import { BookingModule } from './../src/booking/booking.module';
import { Country } from './../src/locations/country.entity';
import { Offer } from './../src/booking/offer.entity';
import { Location } from './../src/locations/location.entity';

describe('Application API (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqljs',
          name: 'default',
          autoSave: false,
          location: './test/db/sql.test.db',
          entities: [Location, Country, Offer, Booking],
          logging: true,
        }),
        LocationsModule,
        BookingModule,
      ],
      exports: [TypeOrmModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  test('/api/booking/availability (GET) replies with status 200 on success', () => {
    return request(app.getHttpServer())
      .get(
        '/api/booking/availability?locationId=5f3543ae-3958-4966-b465-64715a8d0faf&startDate=2019-11-01&endDate=2019-11-03',
      )
      .expect(200);
  });
  test('/api/booking/availability (GET) replies with status 400 if period is invalid', () => {
    return request(app.getHttpServer())
      .get(
        '/api/booking/availability?locationId=5f3543ae-3958-4966-b465-64715a8d0faf&startDate=2019-11-03&endDate=2019-11-01',
      )
      .expect('Content-Type', /json/)
      .expect(400);
  });

  test('/api/booking (POST) replies with status 400 if period is invalid', () => {
    return request(app.getHttpServer())
      .post('/api/booking')
      .send({
        offerId: '1',
        startDate: '2019-12-01',
        endDate: '2019-11-05',
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });

  test('/api/booking (POST) replies with status 400 if offer id does not exist', () => {
    return request(app.getHttpServer())
      .post('/api/booking')
      .send({
        offerId: 'not existing id',
        startDate: '2019-12-01',
        endDate: '2019-11-05',
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });
});
