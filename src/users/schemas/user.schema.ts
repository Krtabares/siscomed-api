import { Schema, Document } from 'mongoose';

export enum TipoUsuario {
  Admin = 'Admin',
  Niño = 'Niño',
  Profesor = 'Profesor',
  Personal = 'Personal',
}

export interface User {
  nombre: string;
  tipoUsuario: TipoUsuario;
  codigoQR: string;
  activo: boolean;
  representante?: string | null;  // Solo para niños, relación con el representante
  password: string ;  // Agregar la propiedad 'password'
  email: string;
  telefono?: string;
  direccion?: string;
}

export interface UserDocument extends User, Document {}

export const UserSchema = new Schema<UserDocument>({
  nombre: { type: String, required: true },
  tipoUsuario: { type: String, enum: TipoUsuario, required: true },
  codigoQR: { type: String, required: true },
  activo: { type: Boolean, default: true },
  representante: { type: Schema.Types.ObjectId, ref: 'User' },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String },
  direccion: { type: String },
});
