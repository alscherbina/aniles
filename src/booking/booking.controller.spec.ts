import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { getRepositoryToken, getEntityManagerToken } from '@nestjs/typeorm';
import { Booking } from './booking.entity';

const mockRepository = {};

describe('Booking Controller', () => {
  let controller: BookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        BookingService,
        {
          provide: getRepositoryToken(Booking),
          useValue: mockRepository,
        },
        {
          provide: getEntityManagerToken('default'),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
  });

  it('should be defined ', () => {
    expect(controller).toBeDefined();
  });
});
