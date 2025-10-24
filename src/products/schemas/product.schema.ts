import { Schema, Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface Product {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  fotoURL?: string;
  disponible: boolean;
}

export interface ProductDocument extends Product, Document {}

export const ProductSchema = new Schema<ProductDocument>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  fotoURL: { type: String },
  disponible: { type: Boolean, default: true },
});
