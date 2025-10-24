import { Test, TestingModule } from '@nestjs/testing';
import { CreditAccountController } from './credit-account.controller';

describe('CreditAccountController', () => {
  let controller: CreditAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditAccountController],
    }).compile();

    controller = module.get<CreditAccountController>(CreditAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
