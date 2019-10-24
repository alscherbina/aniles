import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Location } from './location.entity';

const mockRepository = {
  find: jest.fn(()=>[new Location(), new Location()])
};

describe('Locations Controller', () => {
  let controller: LocationsController;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [
        LocationsService,
        {
          provide: getRepositoryToken(Location),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('listLocations() should return value of Location[] type', async () => {
    const locations = await controller.listLocations();
    expect(locations).toBeInstanceOf(Array);
    expect(locations[0]).toBeInstanceOf(Location);
  })
});
