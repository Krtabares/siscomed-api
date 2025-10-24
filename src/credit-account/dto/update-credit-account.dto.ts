import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCreditAccountDto {
  @ApiProperty({ description: 'Nuevo saldo pendiente', example: 15.5 })
  @IsNotEmpty()
  @IsNumber()
  saldoPendiente: number;
}
