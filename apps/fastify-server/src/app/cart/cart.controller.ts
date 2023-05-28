import {
  Body,
  Controller,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { CartResponse } from 'src/data.response';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  async addToCart(
    @Body('email') email: string,
    @Body('cart') cart: { productId: string; quantity: number }[],
  ): Promise<CartResponse | null> {
    const result = await this.cartService.addToCart(email, cart);
    if (!result?.cart) {
      return null;
    }
    return { cart: result.cart };
  }

  @Post('/get')
  async getCart(@Body('email') email: string): Promise<CartResponse | null> {
    const result = await this.cartService.getCart(email);
    return result;
  }

  @Delete(':email/:productId')
  async deleteProductFromCart(
    @Param('email') email: string,
    @Param('productId') productId: string,
  ): Promise<CartResponse> {
    return this.cartService.deleteProductFromCart(email, productId);
  }

  @Delete('/:email/deletefromcart')
  async deleteProductsFromCart(
    @Param('email') email: string,
    @Body('products') productIds: string[],
  ): Promise<CartResponse> {
    return this.cartService.deleteProductsFromCart(email, productIds);
  }

  @Delete(':email/cart')
  async deleteAllFromCart(
    @Param('email') email: string,
  ): Promise<CartResponse> {
    return this.cartService.deleteAllFromCart(email);
  }

}
