import { Module } from '@nestjs/common';
import { OrderSchema } from '../order/schemas/order.schema';
import { CreditAccountSchema } from '../credit-account/schemas/credit-account.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsService } from './report.service';
import { ReportsController } from './report.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }, { name: 'CreditAccount', schema: CreditAccountSchema }])],
  providers: [ReportsService],
  controllers: [ReportsController]
})
export class ReportModule {}
