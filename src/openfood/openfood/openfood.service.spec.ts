import { Test, TestingModule } from '@nestjs/testing';
import { OpenfoodService } from './openfood.service';

describe('OpenfoodService', () => {
  let service: OpenfoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenfoodService],
    }).compile();

    service = module.get<OpenfoodService>(OpenfoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
