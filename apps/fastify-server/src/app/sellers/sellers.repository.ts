import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Seller } from './sellers.model';
import { Product } from '../products/product.model';
import { Order } from '../orders/order.model';

@Injectable()
export class SellersRepository {
  constructor(@InjectModel('Seller') private sellersModel: Model<Seller>) {}

  async findOne(sellerFilterQuery: FilterQuery<Seller>): Promise<Seller> {
    return await this.sellersModel
      .findOne(sellerFilterQuery)
      .populate('products')
      .exec();
  }

  async find(sellersFilterQuery: FilterQuery<Seller>): Promise<Seller[]> {
    return await this.sellersModel
      .find(sellersFilterQuery)
      .populate('products');
  }

  async create(seller: Seller): Promise<Seller> {
    const newSeller = new this.sellersModel(seller);
    return await newSeller.save();
  }

  async findOneAndUpdate(
    sellerFilterQuery: FilterQuery<Seller>,
    seller: Partial<Seller>,
    options?: QueryOptions,
  ): Promise<Seller> {
    return await this.sellersModel.findOneAndUpdate(
      sellerFilterQuery,
      seller,
      options,
    );
  }

  async deleteOne(sellerFilterQuery: FilterQuery<Seller>): Promise<void> {
    await this.sellersModel.deleteOne(sellerFilterQuery);
  }

  async getAllProductsBySeller(email: string): Promise<Product[]> {
    const seller = await this.sellersModel
      .findOne({ email })
      .populate('products')
      .exec();
    return seller.products as unknown as Product[];
  }

  async getAllProductsBySellerId(sellerId: string): Promise<Product[]> {
    const seller = await this.sellersModel
      .findOne({ _id: sellerId })
      .populate('products')
      .exec();
    return seller.products as unknown as Product[];
  }

  async getAllOrdersBySeller(email: string): Promise<Order[]> {
    const seller = await this.sellersModel
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
    return seller.orders as unknown as Order[];
  }
}
