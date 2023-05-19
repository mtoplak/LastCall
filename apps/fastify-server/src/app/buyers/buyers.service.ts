import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model, Types } from 'mongoose';
import { Buyer } from './buyers.model';
import { Product } from '../products/product.model';
import { CreateUpdateBuyerDto } from './createUpdateBuyer.dto';
import { BuyersRepository } from './buyers.repository';

@Injectable()
export class BuyersService {
  constructor(
    private readonly buyersRepository: BuyersRepository,
    @InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async addBuyer(
    buyerData: CreateUpdateBuyerDto,
    productData: { productId: string; quantity: number }[],
  ): Promise<Buyer> {
    return await this.buyersRepository.create(buyerData, productData);
  }

  async getAllBuyers(): Promise<Buyer[]> {
    return await this.buyersRepository.find({});
  }

  async getSingleBuyer(buyerId: string): Promise<Buyer> {
    const buyer = await this.buyersRepository.findOne({ _id: buyerId });
    if (!buyer) {
      throw new NotFoundException(
        'Could not get the buyer with id: ' + buyerId,
      );
    }
    return buyer as Buyer;
  }

  async updateBuyer(
    buyerId: string,
    updatedBuyerData: Partial<Buyer>,
  ): Promise<Buyer> {
    try {
      return await this.buyersRepository.findOneAndUpdate(
        { _id: buyerId },
        updatedBuyerData,
      );
    } catch (err) {
      throw new NotFoundException(
        'Failed to update buyer with id: ' + buyerId,
      );
    }
  }

  async removeBuyer(buyerId: string): Promise<{ success: boolean }> {
    await this.buyersRepository.deleteOne({
      _id: buyerId,
    });
    return { success: true };
  }

}
