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

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @UseGuards(FirebaseTokenGuard)
  async addRating(
    @Body() createRatingDto: CreateUpdateRatingDto,
    @Body('seller') sellerEmail: string,
    @Body('buyer') buyerEmail: string,
  ): Promise<Rating> {
    return this.ratingService.createRating(
      createRatingDto,
      sellerEmail,
      buyerEmail,
    );
  }

  @Get()
  async getAllProducts(): Promise<Rating[]> {
    return await this.ratingService.getAllRatings();
  }

  @Get(':id')
  async getSinglerating(@Param('id') id: string): Promise<Rating> {
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
}
