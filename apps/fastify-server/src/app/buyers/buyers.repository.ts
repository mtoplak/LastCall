import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Product } from '../products/product.model';
import { Buyer } from './buyers.model';
import { Order } from '../orders/order.model';
import { SuccessResponse } from 'src/data.response';

@Injectable()
export class BuyersRepository {
  constructor(
    @InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async findOne(buyerFilterQuery: FilterQuery<Buyer>): Promise<Buyer> {
    try {
      return this.buyerModel
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
    } catch (err) {
      throw new NotFoundException('Could not get the buyer.');
    }
  }

  async find(buyersFilterQuery: FilterQuery<Buyer>): Promise<Buyer[]> {
    try {
      return this.buyerModel
        .find(buyersFilterQuery)
        .populate('orders')
        .populate({
          path: 'cart',
          populate: { path: 'productId', model: 'Product' },
        })
        .exec();
    } catch (err) {
      throw new NotFoundException('Could not get the buyers.');
    }
  }

  async create(buyer: Buyer): Promise<Buyer> {
    try {
      return new this.buyerModel(buyer).save();
    } catch (err) {
      throw new NotFoundException('Could not create the buyer.');
    }
  }

  async findOneAndUpdate(
    buyerFilterQuery: FilterQuery<Buyer>,
    buyer: Partial<Buyer>,
    options?: QueryOptions,
  ): Promise<Buyer> {
    try {
      return this.buyerModel
        .findOneAndUpdate(buyerFilterQuery, buyer, options)
        .populate({
          path: 'cart.productId',
          model: 'Product',
        })
        .exec();
    } catch (err) {
      throw new NotFoundException('Could not update the buyer');
    }
  }

  async deleteOne(buyerFilterQuery: FilterQuery<Buyer>): Promise<SuccessResponse> {
    try {
      await this.buyerModel.deleteOne(buyerFilterQuery);
      return { success: true };
    } catch (err) {
      throw new NotFoundException('Could not delete the buyer');
    }
  }

  async getOrdersByBuyer(email: string): Promise<Order[]> {
    try {
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
    } catch (err) {
      throw new NotFoundException('Could not get the orders by this buyer.');
    }
  }
}
