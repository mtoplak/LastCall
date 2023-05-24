import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { Order } from './order.model';
import { OrdersRepository } from './orders.repository';
import { CreateUpdateOrderDto } from './createUpdateOrder.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async addOrder(
    orderData: CreateUpdateOrderDto,
    productData: { productId: string; quantity: number }[],
    sellerEmail: string,
    buyerEmail: string,
  ): Promise<Order> {
    return await this.ordersRepository.create(
      orderData,
      productData,
      sellerEmail,
      buyerEmail,
    );
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.ordersRepository.find({});
  }

  async getSingleOrder(orderId: string): Promise<Order> {
    try {
      return await this.ordersRepository.findOne({ _id: orderId });
    } catch (err) {
      throw new NotFoundException('Could not get the order with id ' + orderId);
    }
  }

  async updateOrder(
    orderId: string,
    updatedOrderData: Partial<Order>,
  ): Promise<Order> {
    try {
      return await this.ordersRepository.findOneAndUpdate(
        { _id: orderId },
        updatedOrderData,
      );
    } catch (err) {
      throw new NotFoundException(
        'Failed to update the order with id: ' + orderId,
      );
    }
  }

  async removeOrder(orderId: string): Promise<{ success: boolean }> {
    await this.ordersRepository.deleteOne({
      _id: orderId,
    });
    return { success: true };
  }
}
