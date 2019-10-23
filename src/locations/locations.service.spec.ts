import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Location } from './location.entity';

let mockRepository = {};

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
});
