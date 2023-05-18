import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model, Types } from 'mongoose';
import { Order } from '../orders/order.model';
import { Seller } from '../sellers/sellers.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('Seller') private readonly sellerModel: Model<Seller>,
  ) {}

  async insertProduct(
    productData: Partial<Product>,
    sellerId: string,
  ): Promise<string> {
    const { ...restProductData } = productData;

    const seller = await this.sellerModel.findById(sellerId);
    if (!seller) {
      throw new NotFoundException(
        'Seller with id ' + sellerId + ' not found for this product',
      );
    }

    const newProduct = new this.productModel({
      ...restProductData,
      seller: seller._id,
    });

    const result = await newProduct.save();

    seller.products.push(result._id);
    await seller.save();

    return result.id as string;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find().populate('seller').exec();
    return products as Product[];
  }

  async getSingleProduct(productId: string): Promise<Product> {
    const product = await this.findProduct(productId);
    if (!product) {
      throw new NotFoundException(
        'Could not get the product with id ' + productId,
      );
    }
    return product as Product;
  }

  async updateProduct(
    productId: string,
    updatedProductData: Partial<Product>,
  ): Promise<void> {
    if (!Types.ObjectId.isValid(productId)) {
      throw new NotFoundException('Invalid productId');
    }
    const updatedProduct = await this.findProduct(productId);
    if (!updatedProduct) {
      throw new NotFoundException(
        'Product with id ' + productId + ' not found',
      );
    }
    const updatedProductFields: Partial<Product> = { ...updatedProductData };
    try {
      await this.productModel
        .updateOne({ _id: productId }, { $set: updatedProductFields })
        .exec();
    } catch (error) {
      throw new Error('Failed to update product with id ' + productId);
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException(
        'Could not remove the product with id ' + productId,
      );
    }
    await this.productModel.deleteOne({ _id: productId }).exec();
  }

  private async findProduct(productId: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel
        .findById(productId)
        .populate('seller')
        .exec();
    } catch (error) {
      throw new NotFoundException(
        'Could not find the product with id: ' + productId,
      );
    }
    /*
        if (!product) {
          throw new NotFoundException("Could not find the product with id: " + productId);
        }
        */
    return product;
  }
}
