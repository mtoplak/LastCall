import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Product } from '../products/product.model';
import { Buyer } from './buyers.model';
import { Order } from '../orders/order.model';

@Injectable()
export class BuyersRepository {
  constructor(
    @InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async findOne(buyerFilterQuery: FilterQuery<Buyer>): Promise<Buyer> {
    return await this.buyerModel
      .findOne(buyerFilterQuery)
      .populate('orders')
      .populate({
        path: 'cart',
        populate: { path: 'productId', model: 'Product' },
      })
      .exec();
  }

  async getBuyerByEmail(email: string): Promise<Buyer | null> {
    return this.buyerModel.findOne({ email }).exec();
  }

  async find(buyersFilterQuery: FilterQuery<Buyer>): Promise<Buyer[]> {
    return await this.buyerModel
      .find(buyersFilterQuery)
      .populate('orders')
      .populate({
        path: 'cart',
        populate: { path: 'productId', model: 'Product' },
      })
      .exec();
  }

  async create(buyer: Buyer): Promise<Buyer> {
    return await new this.buyerModel(buyer).save();
  }

  async findOneAndUpdate(
    buyerFilterQuery: FilterQuery<Buyer>,
    buyer: Partial<Buyer>,
    options?: QueryOptions,
  ): Promise<Buyer> {
    return await this.buyerModel.findOneAndUpdate(
      buyerFilterQuery,
      buyer,
      options,
    );
  }

  async deleteOne(
    buyerFilterQuery: FilterQuery<Buyer>,
  ): Promise<{ success: boolean }> {
    await this.buyerModel.deleteOne(buyerFilterQuery);
    return { success: true };
  }

  async addToCart(
    email: string,
    productData: { productId: string; quantity: number }[],
  ): Promise<{ cart: { productId: Product; quantity: number }[] } | null> {
    const buyer = await this.buyerModel.findById(email);
    if (!buyer) {
      return null;
    }
    const productIds = productData.map((item) => item.productId);
    const quantities = productData.map((item) => item.quantity);
    if (!productIds || productIds.length === 0) {
      throw new NotFoundException('There are no products in this cart');
    }
    const products = await this.productModel.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) {
      throw new NotFoundException('Products for this cart not found');
    }
    const productsInCart = products.map((product, index) => ({
      productId: product._id,
      quantity: quantities[index],
    }));

    buyer.cart = productsInCart;
    await buyer.save();
    return { cart: buyer.cart };
  }

  async getCart(
    email: string,
  ): Promise<{ cart: { product: Product; quantity: number }[] } | null> {
    const buyer = await this.buyerModel
      .findOne({ email })
      .populate('cart.productId')
      .exec();
    if (!buyer) {
      throw new NotFoundException('Buyer of this cart not found');
    }

    const populatedCart = buyer.cart.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
    }));

    return { cart: populatedCart };
  }

  async getOrdersByBuyer(email: string): Promise<Order[]> {
    const buyer = await this.buyerModel
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
    return buyer.orders as unknown as Order[];
  }
}
