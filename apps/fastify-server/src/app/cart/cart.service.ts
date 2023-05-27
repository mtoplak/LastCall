import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../products/products.repository';
import { CartResponse } from 'src/data.response';
import { BuyersRepository } from '../buyers/buyers.repository';
import { Cart } from '../buyers/buyers.model';

@Injectable()
export class CartService {
  constructor(
    private readonly buyersRepository: BuyersRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

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
        existingItem.quantity += quantity;
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

  async deleteProductsFromCart(
    email: string,
    productIds: string[]
  ): Promise<CartResponse> {
    const buyer = await this.buyersRepository.findOne({ email });
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }
  
    const existingProducts = buyer.cart.some((item) =>
      productIds.includes(item.productId._id.toString())
    );
    
    if (!existingProducts) {
      throw new NotFoundException('Products not found in the cart');
    }
  
    buyer.cart = buyer.cart.filter(
      (item) => !productIds.includes(item.productId._id.toString())
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

}
