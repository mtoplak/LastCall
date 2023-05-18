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

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async addOrder(
    @Body() orderData: Partial<Order>,
    @Body('products') products: { productId: string; quantity: number }[],
    @Body('seller') seller: string,
    @Body('buyer') buyer: string,
  ): Promise<{ id: string }> {
    const productData = products || [];

    const generatedID = await this.ordersService.addOrder(
      orderData,
      productData,
      seller,
      buyer,
    );

    return { id: generatedID };
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    const orders = await this.ordersService.getAllOrders();
    return orders;
  }

  @Get(':id')
  async getSingleOrder(@Param('id') id: string): Promise<Order> {
    const order = await this.ordersService.getSingleOrder(id);
    return order;
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
