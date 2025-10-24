import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Sandwich Natural' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Descripción del producto', example: 'Sandwich natural con verduras frescas' })
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty({ description: 'Precio del producto', example: 2.5 })
  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @ApiProperty({ description: 'Categoría del producto', example: 'Alimentos' })
  @IsNotEmpty()
  @IsString()
  categoria: string;

  @ApiProperty({ description: 'URL de la foto del producto', example: 'http://imagen.com/producto.jpg', required: false })
  @IsOptional()
  @IsString()
  fotoURL?: string;

  @ApiProperty({ description: 'Disponibilidad del producto', example: true, default: true })
  @IsOptional()
  @IsBoolean()
  disponible?: boolean;
}
