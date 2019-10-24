import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { getRepositoryToken, TypeOrmModule, getEntityManagerToken } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CheckAvailabilityDto, CheckAvailabilityRO } from './dto/check-availability.dto';

let mockRepository:any = {};

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(async () => {

    mockRepository = {
      create: jest.fn().mockReturnThis(),
      createQueryBuilder: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      leftJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      addGroupBy: jest.fn().mockReturnThis(),
      having: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockReturnValue([]),
      getRawOne: jest.fn().mockReturnValue({}),
      transaction: jest.fn().mockReturnValue({}),
      setLock: jest.fn().mockReturnThis(),
    };

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

  test('getAvaliableOffers() should return value of CheckAvailabilityRO[] type', async () => {
    mockRepository.getRawMany = jest.fn().mockReturnValue([{id: 1, offer_type: '2', available: 3}])
    const avaliabilityParams = new CheckAvailabilityDto();
    const offers = await service.getAvaliableOffers(avaliabilityParams);
    expect(offers).toBeInstanceOf(Array);
    expect(offers[0]).toBeInstanceOf(CheckAvailabilityRO);
  });


  test('bookOffer() should return value of Booking type', async () => {
    const transactionManagerMock = {
      ...mockRepository,
      save: jest.fn().mockReturnValue(new Booking())
    }
    mockRepository.transaction = jest.fn(async cb=> await cb(transactionManagerMock));

    const bookingParams = new CreateBookingDto();
    const booking = await service.bookOffer(bookingParams);
    expect(booking).toBeInstanceOf(Booking);
  });

  test('bookOffer() should call save() at least once on success', async () => {
    const transactionManagerMock = {
      ...mockRepository,
      save: jest.fn().mockReturnValue(new Booking())
    }
    mockRepository.transaction = jest.fn(async cb=> await cb(transactionManagerMock));

    const bookingParams = new CreateBookingDto();
    await service.bookOffer(bookingParams);
    expect(transactionManagerMock.save).toBeCalled();
  });

  test('bookOffer() should fail if offer does not exist', async () => {
    const transactionManagerMock = {
      ...mockRepository,
      getRawOne: jest.fn().mockReturnValue(Promise.resolve(undefined))
    }
    mockRepository.transaction = jest.fn(async cb=> await cb(transactionManagerMock));

    const bookingParams = new CreateBookingDto();
    await expect(service.bookOffer(bookingParams)).rejects.toThrow();
  });

  test('bookOffer() should fail if offer is not available', async () => {
    const transactionManagerMock = {
      ...mockRepository,
      getRawOne: jest.fn().mockReturnValueOnce(Promise.resolve(1))
    }
    mockRepository.transaction = jest.fn(async cb=> await cb(transactionManagerMock));

    const bookingParams = new CreateBookingDto();
    await expect(service.bookOffer(bookingParams)).rejects.toThrow();
  });

});
