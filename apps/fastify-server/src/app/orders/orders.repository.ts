import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.model';
import { FilterQuery, Model } from 'mongoose';
import { Product } from '../products/product.model';
import { Cart } from '../buyers/buyers.model';
import { SellersService } from '../sellers/sellers.service';
import { BuyersService } from '../buyers/buyers.service';
import { v4 as uuidv4 } from 'uuid';
import { SuccessResponse } from 'src/data.response';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel('Order') private ordersModel: Model<Order>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly sellersService: SellersService,
    private readonly buyersService: BuyersService,
  ) {}

  async findOne(orderFilterQuery: FilterQuery<Order>): Promise<Order> {
    try {
    return await this.ordersModel
      .findOne(orderFilterQuery)
      .populate('seller')
      .populate('buyer')
      .exec();
    } catch (err) {
      throw new NotFoundException('Could not get the order.');
    }
  }

  async find(ordersFilterQuery: FilterQuery<Order>): Promise<Order[]> {
    try {
    return await this.ordersModel
      .find(ordersFilterQuery)
      .populate('seller')
      .populate('buyer')
      .exec();
    } catch (err) {
      throw new NotFoundException('Could not get the orders.');
    }
  }

  async create(
    orderData: Partial<Order>,
    productData: Cart[],
    sellerEmail: string,
    buyerEmail: string,
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
    const seller = await this.sellersService.getSingleSellerByEmail(
      sellerEmail,
    );
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
    const buyer = await this.buyersService.getSingleBuyerByEmail(buyerEmail);
    if (!buyer) {
      throw new NotFoundException(
        `Could not find the buyer with email ${buyerEmail}`,
      );
    }

    const orderedProducts = products.map((product, index) => ({
      product: { ...product.toObject() },
      quantity: quantities[index],
    }));

    const newOrder = new this.ordersModel({
      ...restOrderData,
      products: orderedProducts,
      buyer: buyer._id,
      seller: seller._id,
      uid: uuidv4().substr(0, 6).toUpperCase(),
    });
    const result = await newOrder.save();

    seller.orders.push(result._id);
    buyer.orders.push(result._id);

    await Promise.all([seller.save(), buyer.save()]);

    return result;
  }

  async findOneAndUpdate(
    orderFilterQuery: FilterQuery<Order>,
    order: Partial<Order>,
  ): Promise<Order> {
    try {	
    return await this.ordersModel.findOneAndUpdate(orderFilterQuery, order);
  } catch (err) {
    throw new NotFoundException('Could not update the order.');
  }
  }

  async deleteOne(orderFilterQuery: FilterQuery<Order>): Promise<SuccessResponse> {
    try {
    await this.ordersModel.deleteOne(orderFilterQuery);
    return { success: true };
  } catch (err) {
    throw new NotFoundException('Could not delete the order.');
  }
  }
  
}
