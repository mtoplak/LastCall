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
  ): Promise<{ success: boolean; }> {
    await this.buyersService.updateBuyer(buyerId, updatedBuyerData);
    return { success: true };
  }

  @Delete(':id')
  async removeBuyer(@Param('id') id: string): Promise<{ success: boolean; }> {
    await this.buyersService.removeBuyer(id);
    return { success: true };
  }

  @Post(':buyerId/cart')
  async addToCart(
    @Param('buyerId') buyerId: string,
    @Body('cart') cart: { productId: string; quantity: number }[],
  ): Promise<{ cart: { productId: Product; quantity: number }[] } | null> {
    const result = await this.buyersService.addToCart(buyerId, cart);
    if (result && result.cart) {
      return { cart: result.cart };
    }
    return null;
  }

  @Get(':buyerId/cart')
  async getCart(
    @Param('buyerId') buyerId: string,
  ): Promise<{ cart: { product: Product; quantity: number }[] } | null> {
    const result = await this.buyersService.getCart(buyerId);
    return result;
  }
}
