import { Controller, Post, Get, Put, Body, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreditAccountService } from './credit-account.service';
import { CreateCreditAccountDto } from './dto/create-credit-account.dto';
import { UpdateCreditAccountDto } from './dto/update-credit-account.dto';
import { CreditAccountDocument } from './schemas/credit-account.schema';

@ApiTags('Cuentas de Crédito')
@Controller('credit-accounts')
export class CreditAccountController {
  constructor(private readonly creditAccountService: CreditAccountService) {}

  @ApiOperation({ summary: 'Crear una cuenta de crédito para un usuario' })
  @ApiResponse({ status: 201, description: 'Cuenta de crédito creada exitosamente.' })
  @Post()
  async create(@Body() createDto: CreateCreditAccountDto): Promise<CreditAccountDocument> {
    return this.creditAccountService.create(createDto);
  }

  @ApiOperation({ summary: 'Obtener la cuenta de crédito de un usuario por su ID' })
  @ApiParam({ name: 'userId', description: 'ID del usuario', example: '60c72b2f9b1d8c001f8b4f83' })
  @ApiResponse({ status: 200, description: 'Cuenta de crédito encontrada.' })
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<CreditAccountDocument> {
    return this.creditAccountService.findByUserId(userId);
  }

  @ApiOperation({ summary: 'Actualizar el saldo pendiente de una cuenta de crédito' })
  @ApiParam({ name: 'id', description: 'ID de la cuenta de crédito', example: '60c72b2f9b1d8c001f8b4f85' })
  @ApiResponse({ status: 200, description: 'Cuenta de crédito actualizada correctamente.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateCreditAccountDto): Promise<CreditAccountDocument> {
    return this.creditAccountService.update(id, updateDto);
  }

  @ApiOperation({ summary: 'Abonar a la cuenta de crédito (disminuir saldo pendiente)' })
  @ApiParam({ name: 'id', description: 'ID de la cuenta de crédito', example: '60c72b2f9b1d8c001f8b4f85' })
  @ApiParam({ name: 'monto', description: 'Monto a abonar', example: 10 })
  @ApiResponse({ status: 200, description: 'Abono realizado correctamente.' })
  @Patch(':id/abonar/:monto')
  async abonar(
    @Param('id') id: string,
    @Param('monto') monto: string, // Recibido como string y luego se convierte
  ): Promise<CreditAccountDocument> {
    const montoNumber = parseFloat(monto);
    return this.creditAccountService.abonar(id, montoNumber);
  }
}
