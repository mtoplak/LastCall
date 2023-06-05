import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsRepository } from './products.repository';
import { CreateUpdateProductDto } from './create-update-product.dto';
import { SuccessResponse } from 'src/data.response';
import { Cart } from '../buyers/buyers.model';
import { SellersService } from '../sellers/sellers.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly sellersService: SellersService,
  ) {}

  async createProduct(
    productData: CreateUpdateProductDto,
    email: string,
  ): Promise<Product> {
    try {
      return await this.productsRepository.create(productData, email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productsRepository.find({});
  }

  async getSingleProduct(productId: string): Promise<Product> {
    try {
      return await this.productsRepository.findOne({ _id: productId });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async updateProduct(
    productId: string,
    productUpdates: CreateUpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.productsRepository.findOneAndUpdate(
        { _id: productId },
        productUpdates,
        { new: true }, // Set the `new` option to true to return the updated document
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async removeProduct(productId: string): Promise<SuccessResponse> {
    return await this.productsRepository.deleteOne({ _id: productId });
  }

  async removeFromStock(productData: Cart[]): Promise<Product[] | false> {
    const updatedProducts: Product[] = [];

    for (const item of productData) {
      const product = await this.getSingleProduct(item.productId);

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
    const seller = await this.sellersService.getSingleSellerByEmail(email);
    if (!seller) {
      throw new NotFoundException('Seller not found');
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
      return false;
    }

    return true;
  }

  async makeSale(productIds: string[], discount: number): Promise<Product[]> {
    const updatedProducts: Product[] = [];

    for (const productId of productIds) {
      const product = await this.productsRepository.findOne({ _id: productId });
      if (!product) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      const actualPrice = product.actualPrice;
      const price = (actualPrice * (100 - discount)) / 100;

      const updatedProduct = await this.productsRepository.findOneAndUpdate(
        { _id: productId },
        { price, discount },
        { new: true },
      );
      if (!updatedProduct) {
        throw new NotFoundException(
          `Failed to update the product with id ${productId}`,
        );
      }

      updatedProducts.push(updatedProduct);
    }

    return updatedProducts;
  }
}
