import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';
import { Seller } from '../sellers/sellers.model';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel('Product') private productsModel: Model<Product>,
    @InjectModel('Seller') private readonly sellerModel: Model<Seller>,
  ) {}

  async findOne(productFilterQuery: FilterQuery<Product>): Promise<Product> {
    try {
      return await this.productsModel
        .findOne(productFilterQuery)
        .populate('seller')
        .exec();
    } catch (err) {
      throw new NotFoundException('Could not get the product with this id');
    }
  }

  async find(productsFilterQuery: FilterQuery<Product>): Promise<Product[]> {
    return await this.productsModel
      .find(productsFilterQuery)
      .populate('seller')
      .exec();
  }

  async create(productData: Product, sellerId: string): Promise<Product> {
    const { ...restProductdata } = productData;
    const seller = await this.sellerModel.findById(sellerId);
    if (!seller) {
      throw new NotFoundException(
        'Could not find the seller with id ' +
          sellerId +
          ' assigned to this order.',
      );
    }
    const newProduct = new this.productsModel({
        ...restProductdata,
        seller: seller._id
    });
    const result = await newProduct.save();
    seller.products.push(result._id);
    await seller.save();
    return result;
  }

  async findOneAndUpdate(
    productFilterQuery: FilterQuery<Product>,
    productUpdates: UpdateQuery<Product>,
    options?: QueryOptions,
  ): Promise<Product> {
    return await this.productsModel.findOneAndUpdate(
      productFilterQuery,
      productUpdates,
      options,
    );
  }
  
  

  async deleteOne(
    productFilterQuery: FilterQuery<Product>,
  ): Promise<{ success: boolean }> {
    await this.productsModel.deleteOne(productFilterQuery);
    return { success: true };
  }

}
