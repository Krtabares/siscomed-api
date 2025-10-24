import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreditAccountDocument } from './schemas/credit-account.schema';
import { CreateCreditAccountDto } from './dto/create-credit-account.dto';
import { UpdateCreditAccountDto } from './dto/update-credit-account.dto';

@Injectable()
export class CreditAccountService {
  constructor(
    @InjectModel('CreditAccount') private creditAccountModel: Model<CreditAccountDocument>,
  ) {}

  // Crear una cuenta de crédito para un usuario
  async create(createCreditAccountDto: CreateCreditAccountDto): Promise<CreditAccountDocument> {
    const account = new this.creditAccountModel(createCreditAccountDto);
    return account.save();
  }

  // Obtener la cuenta de crédito de un usuario dado su ID
  async findByUserId(userId: string): Promise<CreditAccountDocument> {
    const account = await this.creditAccountModel.findOne({ user: userId }).exec();
    if (!account) {
      throw new NotFoundException('Cuenta de crédito no encontrada para el usuario');
    }
    return account;
  }

  // Actualizar el saldo pendiente de una cuenta de crédito
  async update(id: string, updateCreditAccountDto: UpdateCreditAccountDto): Promise<CreditAccountDocument> {
    const updatedAccount = await this.creditAccountModel.findByIdAndUpdate(id, updateCreditAccountDto, { new: true }).exec();
    if (!updatedAccount) {
      throw new NotFoundException('Cuenta de crédito no encontrada');
    }
    return updatedAccount;
  }
  
  // (Opcional) Método para que el representante realice un abono a la cuenta
  async abonar(id: string, monto: number): Promise<CreditAccountDocument> {
    const account = await this.creditAccountModel.findById(id).exec();
    if (!account) {
      throw new NotFoundException('Cuenta de crédito no encontrada');
    }
    // Reducir el saldo pendiente en el monto abonado
    account.saldoPendiente = Math.max(account.saldoPendiente - monto, 0);
    return account.save();
  }
}
