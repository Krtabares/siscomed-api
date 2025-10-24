import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './schemas/order.schema';
import { OrderDetailSchema } from './schemas/order-detail.schema';
import { ProductModule } from 'src/products/products.module';
import { InventorySchema } from 'src/products/schemas/inventory.schema';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'OrderDetail', schema: OrderDetailSchema },
      { name: 'Inventory', schema: InventorySchema },
      // Suponiendo que el modelo de Inventario ya está registrado en otro módulo.
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
