import { Module } from '@nestjs/common';
import { CreditAccountService } from './credit-account.service';
import { CreditAccountController } from './credit-account.controller';
import { CreditAccountSchema } from './schemas/credit-account.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [CreditAccountService],
  controllers: [CreditAccountController],
  imports: [MongooseModule.forFeature([{ name: 'CreditAccount', schema: CreditAccountSchema }])]
})
export class CreditAccountModule {}
