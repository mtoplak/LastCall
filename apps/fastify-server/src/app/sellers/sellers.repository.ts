import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Seller } from './sellers.model';
import { Product } from '../products/product.model';
import { Order } from '../orders/order.model';
import { SuccessResponse } from 'src/data.response';

@Injectable()
export class SellersRepository {
  constructor(
    @InjectModel('Seller') private sellersModel: Model<Seller>,
    @InjectModel('Product') private productsModel: Model<Product>,
  ) {}

  async findOne(sellerFilterQuery: FilterQuery<Seller>): Promise<Seller> {
    try {
      return await this.sellersModel
        .findOne(sellerFilterQuery)
        .populate('products')
        .exec();
    } catch (err) {
      throw new NotFoundException('Could not get the seller.');
    }
  }

  async find(sellersFilterQuery: FilterQuery<Seller>): Promise<Seller[]> {
    try {
      return await this.sellersModel
        .find(sellersFilterQuery)
        .populate('products');
    } catch (err) {
      throw new NotFoundException('Could not find the sellers.');
    }
  }

  async create(seller: Seller): Promise<Seller> {
    try {
      return await new this.sellersModel(seller).save();
    } catch (err) {
      throw new NotFoundException('Could not create the seller.');
    }
  }

  async findOneAndUpdate(
    sellerFilterQuery: FilterQuery<Seller>,
    seller: Partial<Seller>,
    options?: QueryOptions,
  ): Promise<Seller> {
    try {
      return await this.sellersModel.findOneAndUpdate(
        sellerFilterQuery,
        seller,
        options,
      );
    } catch (err) {
      throw new NotFoundException('Could not update the seller.');
    }
  }

  async deleteOne(
    sellerFilterQuery: FilterQuery<Seller>,
  ): Promise<SuccessResponse> {
    try {
      const seller = await this.sellersModel.findOne(sellerFilterQuery);
      if (!seller) {
        throw new NotFoundException('Seller not found.');
      }

      await this.productsModel.find({ seller: seller._id });
      await this.productsModel.deleteMany({ seller: seller._id });
      await this.sellersModel.deleteOne(sellerFilterQuery);
      return { success: true };
    } catch (err) {
      throw new NotFoundException('Could not delete the seller.');
    }
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