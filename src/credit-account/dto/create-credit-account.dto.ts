import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCreditAccountDto {
  @ApiProperty({ description: 'ID del usuario (comensal)', example: '60c72b2f9b1d8c001f8b4f83' })
  @IsNotEmpty()
  @IsString()
  user: string;

  @ApiProperty({ description: 'Saldo pendiente inicial', example: 0, default: 0, required: false })
  @IsOptional()
  @IsNumber()
  saldoPendiente?: number;
}
