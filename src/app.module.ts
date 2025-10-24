import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { CreditAccountModule } from './credit-account/credit-account.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/sistema_comedor'),
    UsersModule,
    AuthModule,
    ProductModule,
    OrderModule,
    CreditAccountModule,
    ReportModule,
  ],
})
export class AppModule {}
