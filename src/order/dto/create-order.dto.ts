import { IsNotEmpty, IsString, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateOrderDetailDto } from './create-order-detail.dto';

export class CreateOrderDto {
  @ApiProperty({ description: 'ID del usuario que realiza el pedido', example: '60c72b2f9b1d8c001f8b4f83' })
  @IsNotEmpty()
  @IsString()
  user: string;

  @ApiProperty({ description: 'Indica si el pedido se realizó a crédito', example: false, default: false })
  @IsBoolean()
  credito?: boolean;

  @ApiProperty({ description: 'Array de detalles del pedido', type: [CreateOrderDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  detalles: CreateOrderDetailDto[];
}
