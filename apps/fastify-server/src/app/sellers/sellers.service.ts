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
    return await this.sellersRepository.deleteOne({
      _id: sellerId,
    });
  }
  

  async removeSellerByEmail(email: string): Promise<SuccessResponse> {
    return await this.sellersRepository.deleteOne({
      email: email,
    });
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

  async calculateAverageScore(
    score: number,
    sellerEmail: string,
  ): Promise<number> {
    
    const seller = await this.getSingleSellerByEmail(sellerEmail);
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    if (seller.scores.length === 0 || seller.averageScore == 0) {
      return score;
    }

    const currentTotalScore = seller.averageScore * seller.scores.length;
    const newTotalScore = currentTotalScore + score;
    const newAverageScore = newTotalScore / (seller.scores.length + 1);

    return newAverageScore;
  }

  async getAverageScoreBySellerId(sellerId: string): Promise<number> {
    try {
      const seller = await this.getSingleSeller(sellerId);
      if (!seller) {
        throw new NotFoundException('Seller not found');
      }
  
      return seller.averageScore;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
