import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsRepository } from './products.repository';
import { CreateUpdateProductDto } from './createUpdateProduct.dto';
import { SuccessResponse } from 'src/data.response';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async createProduct(
    productData: CreateUpdateProductDto,
    email: string,
  ): Promise<Product> {
    const product = await this.productsRepository.create(productData, email);
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
      throw new NotFoundException(
        'Could not get the product with id ' + productId,
      );
    }
    return product;
  }

  async updateProduct(
    productId: string,
    productUpdates: CreateUpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productsRepository.findOneAndUpdate(
      { _id: productId },
      productUpdates,
      { new: true }, // Set the `new` option to true to return the updated document
    );

    if (!updatedProduct) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    return updatedProduct;
  }

  async removeProduct(productId: string): Promise<SuccessResponse> {
    await this.productsRepository.deleteOne({
      _id: productId,
    });
    return { success: true };
  }
}
