import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Product } from '../products/product.model';
import { Buyer } from './buyers.model';

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
  ): Promise<Buyer> {
    return await this.buyerModel.findOneAndUpdate(buyerFilterQuery, buyer);
  }

  async deleteOne(
    buyerFilterQuery: FilterQuery<Buyer>,
  ): Promise<{ success: boolean }> {
    await this.buyerModel.deleteOne(buyerFilterQuery);
    return { success: true };
  }

  async addToCart(
    buyerId: string,
    productData: { productId: string; quantity: number }[],
  ): Promise<{ cart: { productId: Product; quantity: number }[] } | null> {
    const buyer = await this.buyerModel.findById(buyerId);
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
    buyerId: string,
  ): Promise<{ cart: { product: Product; quantity: number }[] } | null> {
    const buyer = await this.buyerModel
      .findById(buyerId)
      .populate('cart.productId');
    if (!buyer) {
      return null;
    }

    const populatedCart = buyer.cart.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
    }));

    return { cart: populatedCart };
  }
}
