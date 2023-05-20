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

@Controller('buyers')
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) {}

  @Post()
  async addBuyer(
    @Body() createBuyerDto: CreateUpdateBuyerDto,
    @Body('cart') cart: { productId: string; quantity: number }[],
  ): Promise<Buyer> {
    return await this.buyersService.addBuyer(createBuyerDto, cart);
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
  ): Promise<{ success: boolean }> {
    await this.buyersService.updateBuyer(buyerId, updatedBuyerData);
    return { success: true };
  }

  @Delete(':id')
  async removeBuyer(@Param('id') id: string): Promise<{ success: boolean }> {
    await this.buyersService.removeBuyer(id);
    return { success: true };
  }
}
