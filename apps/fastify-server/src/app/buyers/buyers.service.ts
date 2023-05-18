import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model, Types } from 'mongoose';
import { Buyer } from './buyers.model';
import { Product } from '../products/product.model';

@Injectable()
export class BuyersService {
  constructor(
    @InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async addBuyer(
    buyerData: Partial<Buyer>,
    productData: { productId: string; quantity: number }[],
  ): Promise<string> {
    const productIds = productData.map((item) => item.productId);
    const quantities = productData.map((item) => item.quantity);
    const { ...restBuyerData } = buyerData;

    if (!productIds || productIds.length === 0) {
      throw new NotFoundException('There are no products in this basket');
    }

    const products = await this.productModel.find({ _id: { $in: productIds } });
    console.log(products);
    if (products.length !== productIds.length) {
      throw new NotFoundException('Products for this basket not found');
    }

    const productsInBasket = products.map((product, index) => ({
      productId: product._id,
      quantity: quantities[index],
    }));

    const newBuyer = new this.buyerModel({
      ...restBuyerData,
      basket: productsInBasket,
    });

    const result = await newBuyer.save();
    return result.id as string;
  }

  async getAllBuyers(): Promise<Buyer[]> {
    const buyers = await this.buyerModel
      .find()
      .populate('orders')
      .populate('basket')
      .exec();
    return buyers as Buyer[];
  }

  async getSingleBuyer(productId: string): Promise<Buyer> {
    const buyer = await this.findBuyer(productId);
    if (!buyer) {
      throw new NotFoundException(
        'Could not get the buyer with id: ' + productId,
      );
    }
    return buyer as Buyer;
  }

  async updateBuyer(
    buyerId: string,
    updatedBuyerData: Partial<Buyer>,
  ): Promise<void> {
    if (!Types.ObjectId.isValid(buyerId)) {
      throw new NotFoundException('Invalid buyerId');
    }
    const updatedBuyer = await this.findBuyer(buyerId);
    if (!updatedBuyer) {
      throw new NotFoundException('Buyer with id ' + buyerId + ' not found');
    }
    const updatedBuyerFields: Partial<Buyer> = { ...updatedBuyerData };
    try {
      await this.buyerModel
        .updateOne({ _id: buyerId }, { $set: updatedBuyerFields })
        .exec();
    } catch (error) {
      throw new Error('Failed to update buyer with id ' + buyerId);
    }
  }

  async removeBuyer(buyerId: string): Promise<void> {
    const buyer = await this.buyerModel.findById(buyerId).exec();
    if (!buyer) {
      throw new NotFoundException(
        'Could not remove the buyer with id ' + buyerId,
      );
    }
    await this.buyerModel.deleteOne({ _id: buyerId }).exec();
  }

  private async findBuyer(buyerId: string): Promise<Buyer> {
    let buyer;
    try {
      buyer = await this.buyerModel
        .findById(buyerId)
        .populate('orders')
        .populate('basket')
        .exec();
    } catch (error) {
      throw new NotFoundException(
        'Could not find the buyer with id: ' + buyerId,
      );
    }
    /*
        if (!buyer) {
            throw new NotFoundException('Could not find the buyer.');
        }
        */
    return buyer;
  }
}
