import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDocument } from './schemas/order.schema';

@ApiTags('Pedidos')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente.' })
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: 'Obtener todos los pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos.' })
  @Get()
  async findAllOrders(): Promise<OrderDocument[]> {
    return this.orderService.findAllOrders();
  }

  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  @ApiParam({ name: 'id', description: 'ID del pedido', example: '60c72b2f9b1d8c001f8b4f83' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado.' })
  @Get(':id')
  async findOrderById(@Param('id') id: string): Promise<OrderDocument> {
    return this.orderService.findOrderById(id);
  }
}
