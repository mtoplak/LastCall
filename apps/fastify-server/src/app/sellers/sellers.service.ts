import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Seller } from './sellers.model';
import { SellersRepository } from './sellers.repository';
import { CreateUpdateSellerDto } from './createUpdateSeller.dto';
import { Product } from '../products/product.model';

@Injectable()
export class SellersService {
  constructor(
    private readonly sellersRepository: SellersRepository,
  ) {}

  async createSeller(
    sellerData: CreateUpdateSellerDto,
  ): Promise<Seller>  {
    return await this.sellersRepository.create(sellerData);
  }

  async getAllSellers(): Promise<Seller[]> {
    try {
      return await this.sellersRepository.find({});
    } catch (err) {
      throw new NotFoundException('Could not find the sellers');
    }
  }

  async getSingleSeller(sellerId: string): Promise<Seller> {
    try {
      return await this.sellersRepository.findOne({ _id: sellerId });
    } catch (err) {
      throw new NotFoundException(
        'Could not get the seller with id ' + sellerId,
      );
    }
  }

  async updateSeller(
    sellerId: string,
    sellerUpdates: CreateUpdateSellerDto,
  ): Promise<Seller> {
    try {
      return await this.sellersRepository.findOneAndUpdate(
        { _id: sellerId },
        sellerUpdates,
      );
    } catch (err) {
      throw new NotFoundException(
        'Failed to update the seller with id: ' + sellerId,
      );
    }
  }


  async removeSeller(sellerId: string): Promise<{ success: boolean }> {
    await this.sellersRepository.deleteOne({
      _id: sellerId,
    });
    return { success: true };
  }

  async getAllProductsBySellerId(sellerId: string): Promise<Product[]> {
    return this.sellersRepository.getAllProductsBySellerId(sellerId);
  }

}
