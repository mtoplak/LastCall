import {
  Body,
  Controller,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartResponse } from 'src/data.response';
import { CartService } from './cart.service';
import { FirebaseTokenGuard } from '../guards/firebase-token-guard';
import { Cart } from '../buyers/buyers.model';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  @UseGuards(FirebaseTokenGuard)
  async addToCart(
    @Body('email') email: string,
    @Body('cart') cart: Cart[],
  ): Promise<CartResponse | null> {
    const result = await this.cartService.addToCart(email, cart);
    if (!result?.cart) {
      return null;
    }
    return { cart: result.cart };
  }

  @Post('/quantity')
  @UseGuards(FirebaseTokenGuard)
  async changeQuantity(
    @Body('email') email: string,
    @Body('cart') cart: { productId: string; quantity: number },
  ): Promise<CartResponse | null> {
    const result = await this.cartService.changeQuantity(email, cart);
    if (!result?.cart) {
      return null;
    }
    return { cart: result.cart };
  }

  @Post('/get')
  @UseGuards(FirebaseTokenGuard)
  async getCart(@Body('email') email: string): Promise<CartResponse | null> {
    return this.cartService.getCart(email);
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

  @Delete(':email')
  async deleteAllFromCart(
    @Param('email') email: string,
  ): Promise<CartResponse> {
    return this.cartService.deleteAllFromCart(email);
  }
}
