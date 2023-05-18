import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import mongoose, { Model, Types } from 'mongoose';
import { Order, OrderModel } from './order.model';
import { title } from 'process';
import { Product } from '../products/product.model';
import { Seller } from '../sellers/sellers.model';
import { Buyer } from '../buyers/buyers.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('Seller') private readonly sellerModel: Model<Seller>,
    @InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async addOrder(
    orderData: Partial<Order>,
    productData: { productId: string; quantity: number }[],
    sellerId: string,
    buyerId: string
  ): Promise<string> {
    const productIds = productData.map((item) => item.productId);
    const quantities = productData.map((item) => item.quantity);
    const { ...restOrderData } = orderData;

    if (!productIds || productIds.length === 0) {
      throw new NotFoundException('There are no products in this order');
    }
    const products = await this.productModel.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) {
      throw new NotFoundException('Products for this order not found');
    }
    const seller = await this.sellerModel.findById(sellerId);
    if (!seller) {
      throw new NotFoundException(
        'Could not find the seller with id ' +
          sellerId +
          ' assigned to this order.',
      );
    }
    const buyer = await this.buyerModel.findById(buyerId);
    if (!buyer) {
      throw new NotFoundException(
        'Could not find the buyer with id ' +
          buyerId +
          ' assigned to this order.',
      );
    }

    const orderedProducts = products.map((product, index) => ({
      productId: product._id,
      quantity: quantities[index],
    }));

    const newOrder = new this.orderModel({
      ...restOrderData,
      products: orderedProducts,
      buyer: buyer._id,
      seller: seller._id,
    });

    const result = await newOrder.save();

    seller.orders.push(result._id);
    await seller.save();

    buyer.orders.push(result._id);
    await buyer.save();

    return result.id as string;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderModel
      .find()
      .populate('seller')
      .populate('buyer')
      .populate({ path: 'products.productId', model: 'Product' })
      .exec();
    return orders as Order[];
  }

  async getSingleOrder(orderId: string): Promise<Order> {
    const order = await this.findOrder(orderId);
    if (!order) {
      throw new NotFoundException('Could not get the order with id ' + orderId);
    }
    return order as Order;
  }

  async updateOrder(
    orderId: string,
    updatedOrderData: Partial<Order>,
  ): Promise<void> {
    if (!Types.ObjectId.isValid(orderId)) {
      throw new NotFoundException('Invalid orderId');
    }
    const updatedOrder = await this.findOrder(orderId);
    if (!updatedOrder) {
      throw new NotFoundException('Order with id ' + orderId + ' not found');
    }
    const updatedOrderFields: Partial<Order> = { ...updatedOrderData };
    try {
      await this.orderModel
        .updateOne({ _id: orderId }, { $set: updatedOrderFields })
        .exec();
    } catch (error) {
      throw new Error('Failed to update order with id ' + orderId);
    }
  }

  async removeOrder(orderId: string): Promise<void> {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException(
        'Could not remove the order with id ' + orderId,
      );
    }
    await this.orderModel.deleteOne({ _id: orderId }).exec();
  }

  private async findOrder(orderId: string): Promise<Order> {
    let order;
    try {
      order = await this.orderModel
        .findById(orderId)
        .populate('seller')
        .populate('buyer')
        .populate({ path: 'products.productId', model: 'Product' })
        .exec();
    } catch (error) {
      throw new NotFoundException(
        'Could not find the order with id ' + orderId,
      );
    }
    /*
        if (!order) {
            throw new NotFoundException('Could not find the order.');
        }
        */
    return order;
  }
}
