import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Location } from './location.entity';

const mockRepository = {
  find: jest.fn(()=>[new Location(), new Location()])
};

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: getRepositoryToken(Location),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('getLocations() should return value of Location[] type', async () => {
    const locations = await service.getLocations();
    expect(locations).toBeInstanceOf(Array);
    expect(locations[0]).toBeInstanceOf(Location);
  })
});
