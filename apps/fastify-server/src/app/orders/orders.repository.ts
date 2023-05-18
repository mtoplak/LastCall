import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.model';
import { FilterQuery, Model } from 'mongoose';
import { Product } from '../products/product.model';
import { Buyer } from '../buyers/buyers.model';
import { Seller } from '../sellers/sellers.model';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel('Order') private ordersModel: Model<Order>,
    @InjectModel('Seller') private readonly sellerModel: Model<Seller>,
    @InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async findOne(orderFilterQuery: FilterQuery<Order>): Promise<Order> {
    return await this.ordersModel
      .findOne(orderFilterQuery)
      .populate('seller')
      .populate('buyer')
      .populate({ path: 'products.productId', model: 'Product' })
      .exec();
  }

  async find(ordersFilterQuery: FilterQuery<Order>): Promise<Order[]> {
    return await this.ordersModel
      .find(ordersFilterQuery)
      .populate('seller')
      .populate('buyer')
      .populate({ path: 'products.productId', model: 'Product' })
      .exec();
  }

  async create(
    orderData: Partial<Order>,
    productData: { productId: string; quantity: number }[],
    sellerId: string,
    buyerId: string,
  ): Promise<Order> {
    const { ...restOrderData } = orderData;
    const productIds = productData.map((item) => item.productId);
    const quantities = productData.map((item) => item.quantity);
    if (!productIds || productIds.length === 0) {
      throw new NotFoundException('There are no products in this order');
    }
    const products = await this.productModel.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) {
      throw new NotFoundException('Products for this order not found');
    }
    const seller = await this.sellerModel.findById(sellerId);
    if (!seller) {
      throw new NotFoundException(
        'Could not find the seller with id ' +
          sellerId +
          ' assigned to this order.',
      );
    }
    const buyer = await this.buyerModel.findById(buyerId);
    if (!buyer) {
      throw new NotFoundException(
        'Could not find the buyer with id ' +
          buyerId +
          ' assigned to this order.',
      );
    }

    const orderedProducts = products.map((product, index) => ({
      productId: product._id,
      quantity: quantities[index],
    }));
    const newOrder = new this.ordersModel({
      ...restOrderData,
      products: orderedProducts,
      buyer: buyer._id,
      seller: seller._id,
    });
    const result = await newOrder.save();
    seller.orders.push(result._id);
    await seller.save();

    buyer.orders.push(result._id);
    await buyer.save();
    return result;
  }

  async findOneAndUpdate(
    orderFilterQuery: FilterQuery<Order>,
    order: Partial<Order>,
  ): Promise<Order> {
    return await this.ordersModel.findOneAndUpdate(orderFilterQuery, order);
  }

  async deleteOne(
    orderFilterQuery: FilterQuery<Order>,
  ): Promise<{ success: boolean }> {
    await this.ordersModel.deleteOne(orderFilterQuery);
    return { success: true };
  }
}
