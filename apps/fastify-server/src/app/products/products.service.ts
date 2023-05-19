import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsRepository } from './products.repository';
import { CreateUpdateProductDto } from './createUpdateProduct.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from '../sellers/sellers.model';
import { ProductMapper } from 'src/data.mapper';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
  ) {}

  async createProduct(
    productData: CreateUpdateProductDto,
    sellerId: string,
  ): Promise<Product> {

    const product = await this.productsRepository.create(productData, sellerId);
    if (!product) {
      throw new NotFoundException('Could not create a product');
    }
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productsRepository.find({});
    } catch (err) {
      throw new NotFoundException('Could not find the products');
    }
  }

  async getSingleProduct(productId: string): Promise<Product> {
      const product = await this.productsRepository.findOne({ _id: productId });
      if (!product) {
        throw new NotFoundException('Could not get the product with id ' + productId);
      }
      return product;
  }

  async updateProduct(
    productId: string,
    productUpdates: CreateUpdateProductDto,
  ): Promise<Product> {
      return await this.productsRepository.findOneAndUpdate(
        { _id: productId },
        productUpdates,
      );
  }

  async removeProduct(productId: string): Promise<{ success: boolean }> {
    await this.productsRepository.deleteOne({
      _id: productId,
    });
    return { success: true };
  }
}
