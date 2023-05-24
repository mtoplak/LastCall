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

  async create(productData: Product, email: string): Promise<Product> {
    const { ...restProductdata } = productData;
    const seller = await this.sellerModel.findOne({ email });
    if (!seller) {
      throw new NotFoundException(
        'Could not find the seller with email ' +
          email +
          ' assigned to this order.',
      );
    }
    const newProduct = new this.productsModel({
      ...restProductdata,
      seller: seller._id,
    });
    const result = await newProduct.save();
    seller.products.push(result._id);
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
    const deletedProduct = await this.productsModel.findOneAndDelete(
      productFilterQuery,
    );
    if (!deletedProduct) {
      throw new NotFoundException('Could not find the product to delete');
    }

    const seller = await this.sellerModel.findOne({
      products: deletedProduct._id,
    });
    if (seller) {
      const productIndex = seller.products.indexOf(deletedProduct._id);
      if (productIndex !== -1) {
        seller.products.splice(productIndex, 1);
        await seller.save();
      }
    }

    return { success: true };
  }
}
