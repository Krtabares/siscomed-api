import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInventoryDto {
  @ApiProperty({ description: 'Cantidad disponible del producto en inventario', example: 100 })
  @IsNotEmpty()
  @IsNumber()
  cantidadDisponible: number;
}
