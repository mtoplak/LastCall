import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { Seller } from './sellers.model';
import { CreateUpdateSellerDto } from './createUpdateSeller.dto';

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

  @Patch(':id')
  async updateSeller(
    @Param('id') sellerId: string,
    @Body() updateSellerDto: CreateUpdateSellerDto,
  ): Promise<{ success: boolean }> {
    await this.sellersService.updateSeller(sellerId, updateSellerDto);
    return { success: true };
  }

  @Delete(':id')
  async removeSeller(@Param('id') id: string): Promise<{ success: boolean }> {
    await this.sellersService.removeSeller(id);
    return { success: true };
  }
}
