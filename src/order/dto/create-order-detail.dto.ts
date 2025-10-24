import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailDto {
  @ApiProperty({ description: 'ID del producto', example: '60c72b2f9b1d8c001f8b4f83' })
  @IsNotEmpty()
  @IsString()
  product: string;

  @ApiProperty({ description: 'Cantidad del producto en el pedido', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @ApiProperty({ description: 'Precio unitario del producto', example: 2.5 })
  @IsNotEmpty()
  @IsNumber()
  precioUnitario: number;
}
