import {
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { DistanceService } from './distance.service';
import { SellersService } from '../sellers/sellers.service';

@Controller('distance')
export class DistanceController {
  constructor(
    private readonly distanceService: DistanceService,
    private readonly sellersService: SellersService
  ) {}

  @Post('/coordinates')
  async getAirDistance(
    @Body('sellerEmail') sellerEmail: string,
    @Body('orderCoordinates') orderCoordinates: number[],
  ): Promise<boolean> {
    const seller = await this.sellersService.getSingleSellerByEmail(sellerEmail);
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
    const distance = await this.distanceService.calculateAirDistance(
      sellerEmail,
      orderCoordinates,
    );

    if (distance > seller.maxDistance) {
      return false;
    }
    return true;
  }
}
