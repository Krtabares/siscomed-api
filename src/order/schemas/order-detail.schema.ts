import { Schema, Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface OrderDetail {
  order: Schema.Types.ObjectId; // Referencia al pedido
  product: Schema.Types.ObjectId; // Referencia al producto
  cantidad: number;
  precioUnitario: number;
}

export interface OrderDetailDocument extends OrderDetail, Document {}

export const OrderDetailSchema = new Schema<OrderDetailDocument>({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
});
