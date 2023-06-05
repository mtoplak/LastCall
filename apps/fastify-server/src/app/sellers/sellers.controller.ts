import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { Seller } from './sellers.model';
import { CreateUpdateSellerDto } from './create-update-seller.dto';
import { Product } from '../products/product.model';
import { Order } from '../orders/order.model';
import { SuccessResponse } from 'src/data.response';
import { FirebaseTokenGuard } from '../guards/firebase-token-guard';

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
  @UseGuards(FirebaseTokenGuard)
  async updateSeller(
    @Param('id') sellerId: string,
    @Body() updateSellerDto: CreateUpdateSellerDto,
  ): Promise<Seller> {
    return await this.sellersService.updateSeller(sellerId, updateSellerDto);
  }

  @Patch('/patch/:email')
  @UseGuards(FirebaseTokenGuard)
  async updateSellerByEmail(
    @Param('email') email: string,
    @Body() updateSellerDto: CreateUpdateSellerDto,
  ): Promise<Seller> {
    return await this.sellersService.updateSellerByEmail(
      email,
      updateSellerDto,
    );
  }

  @Delete(':id')
  @UseGuards(FirebaseTokenGuard)
  async removeSeller(@Param('id') sellerId: string): Promise<SuccessResponse> {
    return this.sellersService.removeSeller(sellerId);
  }
  

  @Delete('/delete/:email')
  @UseGuards(FirebaseTokenGuard)
  async removeSellerByEmail(
    @Param('email') email: string,
  ): Promise<SuccessResponse> {
    return this.sellersService.removeSellerByEmail(email);
  }

  @Get('/productsbyemail/:email')
  async getAllProductsBySeller(
    @Param('email') email: string,
  ): Promise<Product[]> {
    return this.sellersService.getAllProductsBySeller(email);
  }

  @Get('/:id/products')
  async getAllProductsBySellerId(@Param('id') id: string): Promise<Product[]> {
    return this.sellersService.getAllProductsBySellerId(id);
  }

  @Post('/ordersbyemail')
  @UseGuards(FirebaseTokenGuard)
  async getAllOrdersBySeller(@Body('email') email: string): Promise<Order[]> {
    return this.sellersService.getAllOrdersBySeller(email);
  }

  @Get('/average-score/:sellerId')
  async getAverageScoreBySellerId(
    @Param('sellerId') sellerId: string,
  ): Promise<number> {
    try {
      return await this.sellersService.getAverageScoreBySellerId(sellerId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
