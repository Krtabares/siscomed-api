import { Schema, Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface CreditAccount {
  user: Schema.Types.ObjectId; // Referencia al usuario (comensal)
  saldoPendiente: number;
}

export interface CreditAccountDocument extends CreditAccount, Document {}

export const CreditAccountSchema = new Schema<CreditAccountDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  saldoPendiente: { type: Number, default: 0 },
});
