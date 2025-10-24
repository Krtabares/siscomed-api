import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from './schemas/order.schema';
import { OrderDetailDocument } from './schemas/order-detail.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private orderModel: Model<OrderDocument>,
    @InjectModel('OrderDetail') private orderDetailModel: Model<OrderDetailDocument>,
    // Suponemos que el módulo de productos/inventario ya existe
    @InjectModel('Inventory') private inventoryModel: Model<any>, // Tipo any para simplificar, idealmente usar InventoryDocument
  ) {}

  // Crear un pedido y sus detalles, descontando inventario
  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    const { user, credito, detalles } = createOrderDto;
    let total = 0;

    // Validar y procesar cada detalle, calculando el total
    const orderDetails = await Promise.all(
      detalles.map(async (detailDto: CreateOrderDetailDto) => {
        const { product, cantidad, precioUnitario } = detailDto;
        // Verificar inventario
        const inventory = await this.inventoryModel.findOne({ product }).exec();
        if (!inventory) {
          throw new NotFoundException(`Inventario no encontrado para el producto ${product}`);
        }
        if (inventory.cantidadDisponible < cantidad) {
          throw new BadRequestException(`Inventario insuficiente para el producto ${product}`);
        }
        // Descontar inventario
        inventory.cantidadDisponible -= cantidad;
        await inventory.save();

        total += cantidad * precioUnitario;
        // Crear detalle
        const orderDetail = new this.orderDetailModel({
          product,
          cantidad,
          precioUnitario,
        });
        return orderDetail.save();
      }),
    );

    // Crear el pedido con el total calculado y los detalles creados
    const order = new this.orderModel({
      user,
      credito: credito || false,
      total,
      detalles: orderDetails.map(detail => detail._id),
    });
    return order.save();
  }

  // Métodos adicionales: obtener pedidos, actualizar, etc.
  async findAllOrders(): Promise<OrderDocument[]> {
    return this.orderModel.find().exec();
  }

  async findOrderById(id: string): Promise<OrderDocument> {
    const order = await this.orderModel.findById(id)
      .populate('detalles')
      .exec();
    if (!order) throw new NotFoundException('Pedido no encontrado');
    return order;
  }

  // Otros métodos como actualizar o eliminar pueden agregarse según sea necesario.
}
