import { Test, TestingModule } from '@nestjs/testing';
import { OpenfoodController } from './openfood.controller';

describe('OpenfoodController', () => {
  let controller: OpenfoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenfoodController],
    }).compile();

    controller = module.get<OpenfoodController>(OpenfoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
