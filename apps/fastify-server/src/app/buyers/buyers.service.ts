import { Injectable, NotFoundException } from '@nestjs/common';
import { Buyer, Cart } from './buyers.model';
import { CreateUpdateBuyerDto } from './create-update-buyer.dto';
import { BuyersRepository } from './buyers.repository';
import { ProductsRepository } from '../products/products.repository';
import { Order } from '../orders/order.model';
import { SuccessResponse } from 'src/data.response';

@Injectable()
export class BuyersService {
  constructor(
    private readonly buyersRepository: BuyersRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async addBuyer(buyerData: CreateUpdateBuyerDto): Promise<Buyer> {
    return await this.buyersRepository.create(buyerData);
  }

  async getAllBuyers(): Promise<Buyer[]> {
    return await this.buyersRepository.find({});
  }

  async getSingleBuyer(buyerId: string): Promise<Buyer> {
    const buyer = await this.buyersRepository.findOne({ _id: buyerId });
    if (!buyer) {
      throw new NotFoundException(
        `Buyer with id ${buyerId} not found`,
      );
    }
    return buyer as Buyer;
  }

  async getSingleBuyerByEmail(email: string): Promise<Buyer> {
    return this.buyersRepository.findOne({ email });
  }

  async updateBuyer(
    buyerId: string,
    updatedBuyerData: Partial<Buyer>,
  ): Promise<Buyer> {
    const updatedBuyer = await this.buyersRepository.findOneAndUpdate(
      { _id: buyerId },
      updatedBuyerData,
      { new: true },
    );
    if (!updatedBuyer) {
      throw new NotFoundException(`Buyer with id ${buyerId} not found`);
    }

    return updatedBuyer;
  }

  async updateBuyerByEmail(
    email: string,
    updatedBuyerData: Partial<Buyer>,
  ): Promise<Buyer> {
    const updatedBuyer = await this.buyersRepository.findOneAndUpdate(
      { email },
      updatedBuyerData,
      { new: true },
    );
    if (!updatedBuyer) {
      throw new NotFoundException(`Buyer with email ${email} not found`);
    }

    return updatedBuyer;
  }

  async removeBuyer(buyerId: string): Promise<SuccessResponse> {
    await this.buyersRepository.deleteOne({
      _id: buyerId,
    });
    return { success: true };
  }

  async removeBuyerByEmail(email: string): Promise<SuccessResponse> {
    await this.buyersRepository.deleteOne({
      email: email,
    });
    return { success: true };
  }

  async getOrdersByBuyer(email: string): Promise<Order[]> {
    return this.buyersRepository.getOrdersByBuyer(email);
  }
}
