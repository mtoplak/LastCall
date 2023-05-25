import { Injectable, NotFoundException } from '@nestjs/common';
import { Buyer, Cart } from './buyers.model';
import { CreateUpdateBuyerDto } from './createUpdateBuyer.dto';
import { BuyersRepository } from './buyers.repository';
import { ProductsRepository } from '../products/products.repository';
import { Order } from '../orders/order.model';
import { CartResponse, SuccessResponse } from 'src/common.interfaces';

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

  async addToCart(
    email: string,
    productData: Cart[],
  ): Promise<CartResponse | null> {
    const buyer = await this.buyersRepository.findOne({ email });
    if (!buyer) {
      return null;
    }

    const cartItems = productData.map(({ productId, quantity }) => ({
      productId,
      quantity,
    }));

    if (!cartItems.length) {
      throw new NotFoundException('There are no products in this cart');
    }

    const productIds = cartItems.map((item) => item.productId);

    const products = await this.productsRepository.find({
      _id: { $in: productIds },
    });

    cartItems.forEach(({ productId, quantity }, index) => {
      const existingItem = buyer.cart.find(
        (item) => item.productId._id.toString() === productId,
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        buyer.cart.push({
          productId: products[index],
          quantity: quantity,
        });
      }
    });

    await buyer.save();

    const updatedCart = buyer.cart.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
    }));

    return { cart: updatedCart };
  }

  async getCart(email: string): Promise<CartResponse | null> {
    const buyer = await this.buyersRepository.findOne({ email });
    if (!buyer) {
      throw new NotFoundException('Buyer of this cart not found');
    }

    const populatedCart = buyer.cart.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
    }));

    return { cart: populatedCart };
  }

  async deleteProductFromCart(
    email: string,
    productId: string,
  ): Promise<CartResponse> {
    const buyer = await this.buyersRepository.findOne({ email });
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }

    const existingProduct = buyer.cart.some(
      (item) => item.productId._id.toString() === productId,
    );
    if (!existingProduct) {
      throw new NotFoundException('Product not found in the cart');
    }

    buyer.cart = buyer.cart.filter(
      (item) => item.productId._id.toString() !== productId,
    );

    await buyer.save();

    const updatedCart = buyer.cart.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });

    return { cart: updatedCart };
  }

  async deleteAllFromCart(email: string): Promise<CartResponse> {
    const buyer = await this.buyersRepository.findOne({ email });
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }
    buyer.cart = [];
    await buyer.save();
    return { cart: [] };
  }

  async getOrdersByBuyer(email: string): Promise<Order[]> {
    return this.buyersRepository.getOrdersByBuyer(email);
  }
}
