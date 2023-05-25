import { Injectable, NotFoundException } from '@nestjs/common';
import { Seller } from './sellers.model';
import { SellersRepository } from './sellers.repository';
import { CreateUpdateSellerDto } from './createUpdateSeller.dto';
import { Product } from '../products/product.model';
import { Order } from '../orders/order.model';

@Injectable()
export class SellersService {
  constructor(private readonly sellersRepository: SellersRepository) {}

  async createSeller(sellerData: CreateUpdateSellerDto): Promise<Seller> {
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

  async getSingleSellerByEmail(email: string): Promise<Seller> {
    try {
      return await this.sellersRepository.findOne({ email });
    } catch (err) {
      throw new NotFoundException(
        'Could not get the seller with email ' + email,
      );
    }
  }

  async updateSeller(
    sellerId: string,
    sellerUpdates: CreateUpdateSellerDto,
  ): Promise<Seller> {
    const updatedSeller = await this.sellersRepository.findOneAndUpdate(
      { _id: sellerId },
      sellerUpdates,
      { new: true },
    );
    if (!updatedSeller) {
      throw new NotFoundException(
        'Failed to update the seller with id: ' + sellerId,
      );
    }
    return updatedSeller;
  }

  async updateSellerByEmail(
    email: string,
    sellerUpdates: CreateUpdateSellerDto,
  ): Promise<Seller> {
    const updatedSeller = await this.sellersRepository.findOneAndUpdate(
      { email },
      sellerUpdates,
      { new: true },
    );
    if (!updatedSeller) {
      throw new NotFoundException(
        'Failed to update the seller with email: ' + email,
      );
    }
    return updatedSeller;
  }

  async removeSeller(sellerId: string): Promise<{ success: boolean }> {
    await this.sellersRepository.deleteOne({
      _id: sellerId,
    });
    return { success: true };
  }

  async removeSellerByEmail(email: string): Promise<{ success: boolean }> {
    await this.sellersRepository.deleteOne({
      email: email,
    });
    return { success: true };
  }

  async getAllProductsBySeller(email: string): Promise<Product[]> {
    return this.sellersRepository.getAllProductsBySeller(email);
  }

  async getAllProductsBySellerId(sellerId: string): Promise<Product[]> {
    return this.sellersRepository.getAllProductsBySellerId(sellerId);
  }

  async getAllOrdersBySeller(email: string): Promise<Order[]> {
    return this.sellersRepository.getAllOrdersBySeller(email);
  }
}
