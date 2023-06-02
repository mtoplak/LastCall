import { Injectable, NotFoundException } from '@nestjs/common';
import { Seller } from './sellers.model';
import { SellersRepository } from './sellers.repository';
import { CreateUpdateSellerDto } from './create-update-seller.dto';
import { Product } from '../products/product.model';
import { Order } from '../orders/order.model';
import { SuccessResponse } from 'src/data.response';

@Injectable()
export class SellersService {
  constructor(private readonly sellersRepository: SellersRepository) {}

  async createSeller(sellerData: CreateUpdateSellerDto): Promise<Seller> {
    try {
      return await this.sellersRepository.create(sellerData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getAllSellers(): Promise<Seller[]> {
    try {
      return await this.sellersRepository.find({});
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getSingleSeller(sellerId: string): Promise<Seller> {
    try {
      return await this.sellersRepository.findOne({ _id: sellerId });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getSingleSellerByEmail(email: string): Promise<Seller> {
    try {
      return await this.sellersRepository.findOne({ email });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
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
        { new: true },
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async updateSellerByEmail(
    email: string,
    sellerUpdates: CreateUpdateSellerDto,
  ): Promise<Seller> {
    try {
      return await this.sellersRepository.findOneAndUpdate(
        { email },
        sellerUpdates,
        { new: true },
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async removeSeller(sellerId: string): Promise<SuccessResponse> {
    await this.sellersRepository.deleteOne({
      _id: sellerId,
    });
    return { success: true };
  }

  async removeSellerByEmail(email: string): Promise<SuccessResponse> {
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
