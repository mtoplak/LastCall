import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Seller } from './sellers.model';
import { Product } from '../products/product.model';

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
    return await this.sellersModel.find(sellersFilterQuery).populate('products');
  }

  async create(seller: Seller): Promise<Seller> {
    const newSeller = new this.sellersModel(seller);
    return await newSeller.save();
  }

  async findOneAndUpdate(
    sellerFilterQuery: FilterQuery<Seller>,
    seller: Partial<Seller>,
  ): Promise<Seller> {
    return await this.sellersModel.findOneAndUpdate(sellerFilterQuery, seller);
  }

  async deleteOne(
    sellerFilterQuery: FilterQuery<Seller>,
  ): Promise<{ success: boolean }> {
    await this.sellersModel.deleteOne(sellerFilterQuery);
    return { success: true };
  }

  async getAllProductsBySellerId(sellerId: string): Promise<Product[]> {
    const seller = await this.sellersModel
      .findById(sellerId)
      .populate('products')
      .exec();
    return seller.products as unknown as Product[];
  }
}
