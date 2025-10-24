import { Schema, Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface Order {
  user: Schema.Types.ObjectId; // Referencia al usuario (comensal)
  fecha: Date;
  total: number;
  detalles: Schema.Types.ObjectId[]; // Array de referencias a los detalles del pedido
  credito?: boolean; // Indica si el pedido se realizó a crédito
}

export interface OrderDocument extends Order, Document {}

export const OrderSchema = new Schema<OrderDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fecha: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  detalles: [{ type: Schema.Types.ObjectId, ref: 'OrderDetail' }],
  credito: { type: Boolean, default: false },
});
