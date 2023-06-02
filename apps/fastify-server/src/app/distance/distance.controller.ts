import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { DistanceService } from './distance.service';
import { SellersRepository } from '../sellers/sellers.repository';
import { SellersService } from '../sellers/sellers.service';

@Controller('distance')
export class DistanceController {
  constructor(
    private readonly distanceService: DistanceService,
    private readonly sellersRepository: SellersRepository,
    private readonly sellersService: SellersService
  ) {}

/*  
  @Post()
  async getDistance(
    @Body('sellerEmail') sellerEmail: string,
    @Body('orderId') orderId: string,
  ): Promise<boolean> {
    const seller = await this.sellersRepository.findOne({
      email: sellerEmail,
    });
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
    const distance = await this.distanceService.calculateDistance(
      sellerEmail,
      orderId,
    );
    console.log(distance);

    if (distance > seller.maxDistance) {
      return false;
    }
    return true;
  }
*/

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
    console.log(distance);

    if (distance > seller.maxDistance) {
      return false;
    }
    return true;
  }
}
