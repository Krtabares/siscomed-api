import { Schema, Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface Inventory {
  product: Schema.Types.ObjectId; // Referencia al producto
  cantidadDisponible: number;
}

export interface InventoryDocument extends Inventory, Document {}

export const InventorySchema = new Schema<InventoryDocument>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  cantidadDisponible: { type: Number, required: true },
});
