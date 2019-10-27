import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { getRepositoryToken, getEntityManagerToken } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { CheckAvailabilityDto, CheckAvailabilityRO } from './dto/check-availability.dto';
import { CreateBookingDto } from './dto/create-booking.dto';

const mockRepository = {};

describe('Booking Controller', () => {
  let controller: BookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: {
            getAvaliableOffers: jest.fn().mockResolvedValue([new CheckAvailabilityRO(1,'2','3',4)]),
            bookOffer: jest.fn().mockResolvedValue(new Booking()),
          }
        },
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

  test('checkAvailability() should return value of CheckAvailabilityRO[] type', async () => {
    const avaliabilityParams = new CheckAvailabilityDto();
    const offers = await controller.checkAvailability(avaliabilityParams);
    expect(offers).toBeInstanceOf(Array);
    expect(offers[0]).toBeInstanceOf(CheckAvailabilityRO);
  })

  test('bookOffer() should return value of Booking[] type', async () => {
    const avaliabilityParams = new CreateBookingDto();
    const offers = await controller.bookOffer(avaliabilityParams);
    expect(offers).toBeInstanceOf(Booking);
  })
});
