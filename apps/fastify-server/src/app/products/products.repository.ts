import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';
import { SellersService } from '../sellers/sellers.service';
import { SuccessResponse } from 'src/data.response';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel('Product') private productsModel: Model<Product>,
    private readonly sellersService: SellersService,
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
    try {
      return await this.productsModel
        .find(productsFilterQuery)
        .populate('seller')
        .exec();
    } catch (err) {
      throw new NotFoundException('Could not find the products.');
    }
  }

  async create(productData: Product, email: string): Promise<Product> {
    const { actualPrice, ...restProductdata } = productData;
    const seller = await this.sellersService.getSingleSellerByEmail(email);
    if (!seller) {
      throw new NotFoundException(
        `Could not find the seller with email ${email}.`,
      );
    }

    const newProduct = new this.productsModel({
      ...restProductdata,
      price: actualPrice,
      actualPrice: actualPrice,
      seller: seller._id,
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
    if (productUpdates.actualPrice) {
      productUpdates.price = productUpdates.actualPrice;
    }
    try {
      return await this.productsModel.findOneAndUpdate(
        productFilterQuery,
        productUpdates,
        options,
      );
    } catch (err) {
      throw new NotFoundException('Could not update the product.');
    }
  }

  async deleteOne(productFilterQuery: FilterQuery<Product>): Promise<SuccessResponse> {
    try {
      await this.productsModel.deleteOne(productFilterQuery);
      return { success: true };
    } catch (err) {
      throw new NotFoundException('Could not delete the product.');
    }
  }
  
}
