import { Test, TestingModule } from '@nestjs/testing';
import { CreditAccountService } from './credit-account.service';

describe('CreditAccountService', () => {
  let service: CreditAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditAccountService],
    }).compile();

    service = module.get<CreditAccountService>(CreditAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
