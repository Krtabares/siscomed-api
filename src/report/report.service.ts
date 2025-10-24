import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from '../order/schemas/order.schema';
import { CreditAccountDocument } from 'src/credit-account/schemas/credit-account.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel('Order') private orderModel: Model<OrderDocument>,
    @InjectModel('CreditAccount') private creditAccountModel: Model<CreditAccountDocument>,
  ) {}

  // Genera reporte de ventas agrupado por día, semana o mes.
  async getSalesReport(period: 'day' | 'week' | 'month'): Promise<any> {
    let groupId: any;
    switch (period) {
      case 'day':
        groupId = {
          year: { $year: "$fecha" },
          month: { $month: "$fecha" },
          day: { $dayOfMonth: "$fecha" },
        };
        break;
      case 'week':
        groupId = {
          year: { $year: "$fecha" },
          week: { $week: "$fecha" },
        };
        break;
      case 'month':
        groupId = {
          year: { $year: "$fecha" },
          month: { $month: "$fecha" },
        };
        break;
      default:
        throw new Error("Periodo inválido");
    }

    const report = await this.orderModel.aggregate([
      {
        $group: {
          _id: groupId,
          totalSales: { $sum: "$total" },
          orderCount: { $sum: 1 },
        },
      },
    ]);
    return report;
  }

  // Genera un reporte de todas las cuentas de crédito, incluyendo el saldo pendiente y datos del usuario.
  async getCreditReport(): Promise<any> {
    const report = await this.creditAccountModel.aggregate([
      {
        $lookup: {
          from: "users", // Nombre de la colección de usuarios
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          userId: 1,
          saldoPendiente: 1,
          representanteId: 1,
          userNombre: "$user.nombre",
          userTipo: "$user.tipoUsuario",
        },
      },
    ]);
    return report;
  }

  // Genera un reporte de crédito filtrado por representante.
  async getRepresentativeReport(representativeId: string): Promise<any> {
    const report = await this.creditAccountModel.aggregate([
      { $match: { representanteId: representativeId } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          userId: 1,
          saldoPendiente: 1,
          userNombre: "$user.nombre",
          userTipo: "$user.tipoUsuario",
        },
      },
    ]);
    return report;
  }
}
