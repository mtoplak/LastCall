import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { Seller } from './sellers.model';
import { CreateUpdateSellerDto } from './createUpdateSeller.dto';
import { Product } from '../products/product.model';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  async addSeller(
    @Body() createSellerDto: CreateUpdateSellerDto,
  ): Promise<Seller> {
    return await this.sellersService.createSeller(createSellerDto);
  }

  @Get()
  async getAllSellers(): Promise<Seller[]> {
    return await this.sellersService.getAllSellers();
  }

  @Get(':id')
  async getSingleSeller(@Param('id') id: string): Promise<Seller> {
    return await this.sellersService.getSingleSeller(id);
  }

  @Get('/get/:email')
  async getSingleSellerByEmail(@Param('email') email: string): Promise<Seller> {
    return await this.sellersService.getSingleSellerByEmail(email);
  }

  @Patch(':id')
  async updateSeller(
    @Param('id') sellerId: string,
    @Body() updateSellerDto: CreateUpdateSellerDto,
  ): Promise<Seller> {
    return await this.sellersService.updateSeller(sellerId, updateSellerDto);
  }

  @Patch('/patch/:email')
  async updateSellerByEmail(
    @Param('email') email: string,
    @Body() updateSellerDto: CreateUpdateSellerDto,
  ): Promise<Seller> {
    return await this.sellersService.updateSellerByEmail(email, updateSellerDto);
  }

  @Delete(':id')
  async removeSeller(@Param('id') id: string): Promise<{ success: boolean }> {
    await this.sellersService.removeSeller(id);
    return { success: true };
  }

  @Delete('/delete/:email')
  async removeSellerByEmail(@Param('email') email: string): Promise<{ success: boolean }> {
    await this.sellersService.removeSellerByEmail(email);
    return { success: true };
  }

  @Get(':id/products')
  async getAllProductsBySellerId(
    @Param('id') sellerId: string,
  ): Promise<Product[]> {
    return this.sellersService.getAllProductsBySellerId(sellerId);
  }
}
