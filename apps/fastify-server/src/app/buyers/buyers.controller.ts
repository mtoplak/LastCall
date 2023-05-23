import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { Buyer } from './buyers.model';
import { CreateUpdateBuyerDto } from './createUpdateBuyer.dto';
import { Product } from '../products/product.model';
import { Order } from '../orders/order.model';

@Controller('buyers')
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) { }

  @Post()
  async addBuyer(@Body() createBuyerDto: CreateUpdateBuyerDto): Promise<Buyer> {
    return await this.buyersService.addBuyer(createBuyerDto);
  }

  @Get()
  async getAllBuyers(): Promise<Buyer[]> {
    return await this.buyersService.getAllBuyers();
  }

  @Get(':id')
  async getSingleBuyer(@Param('id') id: string): Promise<Buyer> {
    return await this.buyersService.getSingleBuyer(id);
  }

  @Patch(':id')
  async updateBuyer(
    @Param('id') buyerId: string,
    @Body() updatedBuyerData: Partial<Buyer>,
  ): Promise<Buyer> {
    return await this.buyersService.updateBuyer(buyerId, updatedBuyerData);
  }

  @Delete(':id')
  async removeBuyer(@Param('id') id: string): Promise<{ success: boolean; }> {
    await this.buyersService.removeBuyer(id);
    return { success: true };
  }

  @Post('/addcart')
  async addToCart(
    @Body('email') email: string,
    @Body('cart') cart: { productId: string; quantity: number; }[],
  ): Promise<{ cart: { productId: Product; quantity: number; }[]; } | null> {
    const result = await this.buyersService.addToCart(email, cart);
    if (result && result.cart) {
      return { cart: result.cart };
    }
    return null;
  }

  @Post('/getcart')
  async getCart(
    @Body('email') email: string,
  ): Promise<{ cart: { product: Product; quantity: number; }[]; } | null> {
    const result = await this.buyersService.getCart(email);
    return result;
  }

  @Delete(':email/cart/:productId')
  async deleteProductFromCart(
    @Param('email') email: string,
    @Param('productId') productId: string,
  ): Promise<{ cart: { product: Product; quantity: number; }[]; }> {
    return this.buyersService.deleteProductFromCart(email, productId);
  }

  @Post('orders')
  async getAllProductsBySellerId(
    @Body('email') email: string,
  ): Promise<Order[]> {
    return this.buyersService.getOrdersByBuyer(email);
  }

}
