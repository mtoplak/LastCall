import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsRepository } from './products.repository';
import { CreateUpdateProductDto } from './createUpdateProduct.dto';
import { SuccessResponse } from 'src/data.response';
import { Cart } from '../buyers/buyers.model';
import { SellersRepository } from '../sellers/sellers.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly sellersRepository: SellersRepository,
  ) {}

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

  async removeFromStock(productData: Cart[]): Promise<Product[] | false> {
    const updatedProducts: Product[] = [];

    for (const item of productData) {
      const product = await this.productsRepository.findOne({
        _id: item.productId,
      });

      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }

      if (product.stock < item.quantity) {
        return false;
      }

      product.stock -= item.quantity;

      await product.save();

      updatedProducts.push(product);
    }

    return updatedProducts;
  }

  async minPriceRequirements(
    email: string,
    productData: Cart[],
  ): Promise<boolean> {
    const seller = await this.sellersRepository.findOne({ email });

    if (!seller) {
      throw new NotFoundException(
        'Could not find the seller with email ' + email,
      );
    }

    const minPrice = seller.minPrice;

    const products = await this.productsRepository.find({
      _id: { $in: productData.map((item) => item.productId) },
    });
    
    const totalPrice = products.reduce(
      (total, product, index) =>
        total + productData[index].quantity * product.price,
      0,
    );

    if (totalPrice < minPrice) {
      return false; // Order does not meet the minimum price requirement
    }

    return true; // Order meets the minimum price requirement
  }
}
