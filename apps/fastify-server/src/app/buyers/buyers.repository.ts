import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Product } from '../products/product.model';
import { Buyer } from './buyers.model';
import { Order } from '../orders/order.model';

@Injectable()
export class BuyersRepository {
  constructor(
    @InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async findOne(buyerFilterQuery: FilterQuery<Buyer>): Promise<Buyer> {
    return await this.buyerModel
      .findOne(buyerFilterQuery)
      .populate('orders')
      .populate({
        path: 'cart',
        populate: {
          path: 'productId',
          populate: { path: 'seller', model: 'Seller' },
        },
      })
      .exec();
  }

  async find(buyersFilterQuery: FilterQuery<Buyer>): Promise<Buyer[]> {
    return await this.buyerModel
      .find(buyersFilterQuery)
      .populate('orders')
      .populate({
        path: 'cart',
        populate: { path: 'productId', model: 'Product' },
      })
      .exec();
  }

  async create(buyer: Buyer): Promise<Buyer> {
    return await new this.buyerModel(buyer).save();
  }

  async findOneAndUpdate(
    buyerFilterQuery: FilterQuery<Buyer>,
    buyer: Partial<Buyer>,
    options?: QueryOptions,
  ): Promise<Buyer> {
    const updatedBuyer = await this.buyerModel
      .findOneAndUpdate(buyerFilterQuery, buyer, options)
      .populate({
        path: 'cart.productId',
        model: 'Product',
      })
      .exec();

    if (!updatedBuyer) {
      throw new NotFoundException('Buyer not found');
    }

    return updatedBuyer;
  }

  async deleteOne(
    buyerFilterQuery: FilterQuery<Buyer>,
  ): Promise<{ success: boolean }> {
    await this.buyerModel.deleteOne(buyerFilterQuery);
    return { success: true };
  }

  async getOrdersByBuyer(email: string): Promise<Order[]> {
    const buyer = await this.buyerModel
      .findOne({ email })
      .lean()
      .populate({
        path: 'orders',
        populate: {
          path: 'products',
          populate: { path: 'productId', model: 'Product' },
        },
      })
      .exec();
    return buyer.orders as unknown as Order[];
  }
}
