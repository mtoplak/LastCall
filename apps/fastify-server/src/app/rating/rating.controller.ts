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
import { SuccessResponse } from 'src/data.response';
import { Cart } from '../buyers/buyers.model';
import { FirebaseTokenGuard } from '../guards/firebase-token-guard';
import { RatingService } from './rating.service';
import { CreateUpdateRatingDto } from './create-update-rating.dto';
import { Rating } from './rating.model';
import { Order } from '../orders/order.model';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @UseGuards(FirebaseTokenGuard)
  async addRating(
    @Body() createRatingDto: CreateUpdateRatingDto,
    @Body('seller') sellerEmail: string,
    @Body('buyer') buyerEmail: string,
    @Body('order') orderId: string,
  ): Promise<Rating> {
    return this.ratingService.createRating(
      createRatingDto,
      sellerEmail,
      buyerEmail,
      orderId
    );
  }

  @Get()
  async getAllProducts(): Promise<Rating[]> {
    return await this.ratingService.getAllRatings();
  }

  @Get(':id')
  async getSingleRating(@Param('id') id: string): Promise<Rating> {
    return await this.ratingService.getSingleRating(id);
  }

  @Patch(':id')
  @UseGuards(FirebaseTokenGuard)
  async updateRating(
    @Param('id') ratingId: string,
    @Body() updateRatingDto: CreateUpdateRatingDto,
  ): Promise<Rating> {
    return await this.ratingService.updateRating(ratingId, updateRatingDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseTokenGuard)
  async removeRating(@Param('id') id: string): Promise<SuccessResponse> {
    await this.ratingService.removeRating(id);
    return { success: true };
  }

    @Get('/order/:id')
  async getSingleRatingByOrder(@Param('id') id: string): Promise<number> {
    return await this.ratingService.getSingleRatingByOrder(id);
  }

}
