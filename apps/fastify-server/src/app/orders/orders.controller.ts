import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.model';
import { CreateUpdateOrderDto } from './create-update-order.dto';
import { SuccessResponse } from 'src/data.response';
import { FirebaseTokenGuard } from '../guards/firebase-token-guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @UseGuards(FirebaseTokenGuard)
  async addOrder(
    @Body() createOrderDto: CreateUpdateOrderDto,
    @Body('products') products: { productId: string; quantity: number; }[],
    @Body('seller') sellerEmail: string,
    @Body('buyer') buyerEmail: string,
  ): Promise<Order> {
    return await this.ordersService.addOrder(
      createOrderDto,
      products,
      sellerEmail,
      buyerEmail,
    );
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.ordersService.getAllOrders();
  }

  @Get(':id')
  @UseGuards(FirebaseTokenGuard)
  async getSingleOrder(@Param('id') id: string): Promise<Order> {
    return await this.ordersService.getSingleOrder(id);
  }

  @Patch(':id')
  async updateOrder(
    @Param('id') orderId: string,
    @Body() updatedOrderData: Partial<Order>,
  ): Promise<{ success: boolean; }> {
    await this.ordersService.updateOrder(orderId, updatedOrderData);
    return { success: true };
  }

  @Delete(':id')
  async removeOrder(@Param('id') id: string): Promise<SuccessResponse> {
    await this.ordersService.removeOrder(id);
    return { success: true };
  }

  @Post('/checkPrice')
  async checkPrice(
    @Body('products') products: { productId: string; quantity: number; }[],
    @Body('seller') sellerId: string,
  ): Promise<{ meetsMinPriceRequirements: boolean; }> {
    const meetsMinPriceRequirements = await this.ordersService.checkPrice(
      products,
      sellerId,
    );
    return { meetsMinPriceRequirements };
  }

}
