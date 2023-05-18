import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model, Types } from 'mongoose';
import { Seller } from './sellers.model';

@Injectable()
export class SellersService {
  constructor(
    @InjectModel('Seller') private readonly sellerModel: Model<Seller>,
  ) {}

  async addSeller(
    sellerData: Partial<Seller>,
  ): Promise<string>  {
    const { ...restSellerData } = sellerData;
    const newSeller = new this.sellerModel({
      ...restSellerData,
    });
    const result = await newSeller.save();
    return result.id as string;
  }

  async getAllSellers(): Promise<Seller[]> {
    const sellers = await this.sellerModel
      .find()
      .populate('orders')
      .populate('products')
      .exec();
    return sellers as Seller[];
  }

  async getSingleSeller(sellerId: string): Promise<Seller> {
    const seller = await this.findSeller(sellerId);
    if (!seller) {
      throw new NotFoundException(
        'Could not get the seller with id ' + sellerId,
      );
    }
    return seller as Seller;
  }

  async updateSeller(
    sellerId: string,
    updatedSellerData: Partial<Seller>,
  ): Promise<void> {
    if (!Types.ObjectId.isValid(sellerId)) {
      throw new NotFoundException('Invalid sellerId');
    }
    const updatedSeller = await this.findSeller(sellerId);
    if (!updatedSeller) {
      throw new NotFoundException('Seller with id ' + sellerId + ' not found');
    }
    const updatedSellerFields: Partial<Seller> = { ...updatedSellerData };
    try {
      await this.sellerModel
        .updateOne({ _id: sellerId }, { $set: updatedSellerFields })
        .exec();
    } catch (error) {
      throw new Error('Failed to update seller with id ' + sellerId);
    }
  }

  async removeSeller(sellerId: string): Promise<void> {
    const seller = await this.sellerModel.findById(sellerId).exec();
    if (!seller) {
      throw new NotFoundException(
        'Could not remove the seller with id ' + sellerId,
      );
    }
    await this.sellerModel.deleteOne({ _id: sellerId }).exec();
  }

  private async findSeller(sellerId: string): Promise<Seller> {
    let seller;
    try {
      seller = await this.sellerModel
        .findById(sellerId)
        .populate('orders')
        .populate('products')
        .exec();
    } catch (error) {
      throw new NotFoundException(
        'Could not find the seller with id ' + sellerId,
      );
    }
    /*
        if (!seller) {
            throw new NotFoundException('Could not find the seller.');
        }
        */
    return seller;
  }
}
