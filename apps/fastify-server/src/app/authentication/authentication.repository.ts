import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Buyer } from '../buyers/buyers.model';
import { Seller } from '../sellers/sellers.model';

@Injectable()
export class AuthenticationRepository {
  constructor(
    @InjectModel('Buyer') private buyerModel: Model<Buyer>,
    @InjectModel('Seller') private readonly sellerModel: Model<Seller>,
  ) {}

  async findEmail(email: string): Promise<{ role: string }> {
    const buyer = await this.buyerModel.findOne({ email }).lean().exec();
    if (buyer) {
      return { role: 'buyer' };
    }
    const seller = await this.sellerModel.findOne({ email }).lean().exec();
    if (seller) {
      return { role: 'seller' };
    } else {
      return { role: 'There is no buyer or seller with such email.' };
    }
  }
}
