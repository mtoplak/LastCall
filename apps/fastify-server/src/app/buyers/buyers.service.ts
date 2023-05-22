import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model, Types } from 'mongoose';
import { Buyer } from './buyers.model';
import { Product } from '../products/product.model';
import { CreateUpdateBuyerDto } from './createUpdateBuyer.dto';
import { BuyersRepository } from './buyers.repository';
import { ProductsRepository } from '../products/products.repository';
import { Order } from '../orders/order.model';

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
        'Could not get the buyer with id: ' + buyerId,
      );
    }
    return buyer as Buyer;
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

  async removeBuyer(buyerId: string): Promise<{ success: boolean }> {
    await this.buyersRepository.deleteOne({
      _id: buyerId,
    });
    return { success: true };
  }

  async addToCart(
    email: string,
    productData: { productId: string; quantity: number }[],
  ): Promise<{ cart: { productId: Product; quantity: number }[] } | null> {
    const buyer = await this.buyersRepository.findOne({ email });
    if (!buyer) {
      return null;
    }

    const productIds = productData.map((item) => item.productId);
    const quantities = productData.map((item) => item.quantity);

    if (!productIds || productIds.length === 0) {
      throw new NotFoundException('There are no products in this cart');
    }

    const products = await this.productsRepository.find({
      _id: { $in: productIds },
    });
    if (products.length !== productIds.length) {
      throw new NotFoundException('Products for this cart not found');
    }

    const productsInCart = products.map((product, index) => ({
      productId: product,
      quantity: quantities[index],
    }));

    buyer.cart = productsInCart;
    await buyer.save();
    return { cart: buyer.cart };
  }

  async getCart(
    email: string,
  ): Promise<{ cart: { product: Product; quantity: number }[] } | null> {
    const buyer = await this.buyersRepository.getCart(email);
    if (!buyer) {
      throw new NotFoundException('Buyer of this cart not found');
    }

    const populatedCart = buyer.cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    return { cart: populatedCart };
  }

  async getOrdersByBuyer(email: string): Promise<Order[]> {
    return this.buyersRepository.getOrdersByBuyer(email);
  }
}
