import { Injectable, NotFoundException } from '@nestjs/common';
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

  async removeBuyer(buyerId: string): Promise<{ success: boolean }> {
    await this.buyersRepository.deleteOne({
      _id: buyerId,
    });
    return { success: true };
  }

  async removeBuyerByEmail(email: string): Promise<{ success: boolean }> {
    await this.buyersRepository.deleteOne({
      email: email,
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

    // Create a map of existing products in the cart
    const existingProductsMap = new Map<string, number>();
    buyer.cart.forEach((item) => {
      existingProductsMap.set(item.productId._id.toString(), item.quantity);
    });

    for (const productInCart of productsInCart) {
      const productId = productInCart.productId._id.toString();
      console.log('productID: ' + productId);
      const existingQuantity = existingProductsMap.get(productId);

      if (existingQuantity !== undefined) {
        console.log('Product already exists in the cart');
        const updatedQuantity = existingQuantity + productInCart.quantity;
        existingProductsMap.set(productId, updatedQuantity);
      } else {
        console.log('Adding the product: ' + productId);
        existingProductsMap.set(productId, productInCart.quantity);
      }
    }

    // Update the buyer's cart with the updated quantities
    // Update the buyer's cart with the updated quantities and complete product objects
    buyer.cart = Array.from(existingProductsMap, ([productId, quantity]) => {
      const product = products.find((p) => p._id.toString() === productId);
      if (!product) {
        console.log('Product not found');
      }
      return {
        productId: product,
        quantity,
      };
    });

    await buyer.save();

    return { cart: buyer.cart };
  }

  async updateCart(
    email: string,
    productData: { productId: string; quantity: number }[],
  ): Promise<{ cart: { productId: Product; quantity: number }[] } | null> {
    const buyer = await this.buyersRepository.findOne({ email });
    if (!buyer) {
      console.log('ni buyerja');
      return null;
    }

    const productIds = productData.map((item) => item.productId);
    const quantities = productData.map((item) => item.quantity);
    console.log('productIds: ' + productIds + ' in quantites: ' + quantities);
    if (!productIds || productIds.length === 0) {
      throw new NotFoundException('There are no products in this request');
    }

    const products = await this.productsRepository.find({
      _id: { $in: productIds },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException('Products for this request not found');
    }

    //if (buyer.cart.length === 0) {
    // If the cart is empty, add the products directly
    buyer.cart = products.map((product, index) => ({
      productId: product,
      quantity: quantities[index],
    }));
    //} else {

    const updatedCart = buyer.cart.map((item) => {
      const updatedProduct = productData.find(
        (product) => product.productId === item.productId.toString(),
      );
      if (updatedProduct) {
        return {
          productId: item.productId,
          quantity: updatedProduct.quantity,
        };
      }
      return item;
    });

    buyer.cart = updatedCart;
    //}

    await buyer.save();

    return { cart: buyer.cart };
  }

  async getCart(
    email: string,
  ): Promise<{ cart: { product: Product; quantity: number }[] } | null> {
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
  ): Promise<{ cart: { productId: Product; quantity: number }[] }> {
    const buyer = await this.buyersRepository.findOne({ email });
    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }

    const existingProductIndex = buyer.cart.findIndex(
      (item) => item.productId._id.toString() === productId,
    );
    if (existingProductIndex === -1) {
      throw new NotFoundException('Product not found in the cart');
    }

    buyer.cart.splice(existingProductIndex, 1);
    await buyer.save();

    return { cart: buyer.cart };
  }

  async getOrdersByBuyer(email: string): Promise<Order[]> {
    return this.buyersRepository.getOrdersByBuyer(email);
  }
}
