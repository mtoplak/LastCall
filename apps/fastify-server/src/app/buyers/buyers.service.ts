import { Injectable, NotFoundException } from '@nestjs/common';
import { Buyer, Cart } from './buyers.model';
import { CreateUpdateBuyerDto } from './create-update-buyer.dto';
import { BuyersRepository } from './buyers.repository';
import { Order } from '../orders/order.model';
import { SuccessResponse } from 'src/data.response';

@Injectable()
export class BuyersService {
  constructor(
    private readonly buyersRepository: BuyersRepository,
  ) {}

  async addBuyer(buyerData: CreateUpdateBuyerDto): Promise<Buyer> {
    try {
      return this.buyersRepository.create(buyerData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getAllBuyers(): Promise<Buyer[]> {
    try {
      return this.buyersRepository.find({});
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getSingleBuyer(buyerId: string): Promise<Buyer> {
    try {
      return this.buyersRepository.findOne({ _id: buyerId });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async getSingleBuyerByEmail(email: string): Promise<Buyer> {
    try {
      return this.buyersRepository.findOne({ email });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async updateBuyer(
    buyerId: string,
    updatedBuyerData: Partial<Buyer>,
  ): Promise<Buyer> {
    try {
      return this.buyersRepository.findOneAndUpdate(
        { _id: buyerId },
        updatedBuyerData,
        { new: true },
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async updateBuyerByEmail(
    email: string,
    updatedBuyerData: Partial<Buyer>,
  ): Promise<Buyer> {
    try {
      return this.buyersRepository.findOneAndUpdate(
        { email },
        updatedBuyerData,
        { new: true },
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async removeBuyer(buyerId: string): Promise<SuccessResponse> {
    return await this.buyersRepository.deleteOne({
      _id: buyerId,
    });
  }

  async removeBuyerByEmail(email: string): Promise<SuccessResponse> {
    return await this.buyersRepository.deleteOne({
      email: email,
    });
  }

  async getOrdersByBuyer(email: string): Promise<Order[]> {
    try {
      return this.buyersRepository.getOrdersByBuyer(email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
