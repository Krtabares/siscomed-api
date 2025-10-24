import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { TipoUsuario } from '../schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre completo del usuario', example: 'Juan Pérez' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'juan@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'password123', minLength: 6 })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Tipo de usuario', enum: TipoUsuario, example: TipoUsuario.Niño })
  @IsEnum(TipoUsuario)
  tipoUsuario: TipoUsuario;

  @ApiProperty({ description: 'Código QR asignado al usuario', example: 'QR123456' })
  @IsNotEmpty()
  @IsString()
  codigoQR: string;

  @ApiProperty({ description: 'Indica si el usuario está activo', example: true, default: true })
  @IsOptional()
  activo?: boolean;

  @ApiProperty({ description: 'Teléfono de contacto del usuario', example: '1234567890', required: false })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({ description: 'ID del representante (solo para usuarios de tipo Niño)', example: '60c72b2f9b1d8c001f8b4f83', required: false })
  @IsOptional()
  @IsString()
  representante?: string;
}
