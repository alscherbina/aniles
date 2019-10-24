import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { getRepositoryToken, TypeOrmModule, getEntityManagerToken } from '@nestjs/typeorm';
import { Booking } from './booking.entity';

const mockRepository = {};

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
