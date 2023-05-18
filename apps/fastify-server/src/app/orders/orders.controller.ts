import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.model';
import { CreateUpdateOrderDto } from './createUpdateOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async addOrder(
    @Body() createOrderDto: CreateUpdateOrderDto,
    @Body('products') products: { productId: string; quantity: number }[],
    @Body('seller') seller: string,
    @Body('buyer') buyer: string,
  ): Promise<Order> {
    return this.ordersService.addOrder(createOrderDto, products, seller, buyer);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.ordersService.getAllOrders();
  }

  @Get(':id')
  async getSingleOrder(@Param('id') id: string): Promise<Order> {
    return await this.ordersService.getSingleOrder(id);
  }

  @Patch(':id')
  async updateOrder(
    @Param('id') orderId: string,
    @Body() updatedOrderData: Partial<Order>,
  ): Promise<{ success: boolean }> {
    await this.ordersService.updateOrder(orderId, updatedOrderData);
    return { success: true };
  }

  @Delete(':id')
  async removeOrder(@Param('id') id: string): Promise<{ success: boolean }> {
    await this.ordersService.removeOrder(id);
    return { success: true };
  }
}
