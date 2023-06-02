import { Injectable, NotFoundException } from '@nestjs/common';
import { SuccessResponse } from 'src/data.response';
import { SellersRepository } from '../sellers/sellers.repository';
import { SellersService } from '../sellers/sellers.service';
import { ProductsRepository } from '../products/products.repository';
import { CreateUpdateRatingDto } from './create-update-rating.dto';
import { Rating } from './rating.model';
import { RatingRepository } from './rating.repository';
//GET OCENO ENEGA SELLERJA (ID)
//ZRACUNAJ AVERAGE SCORE

@Injectable()
export class RatingService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly sellersRepository: SellersRepository,
    private readonly sellersService: SellersService,
    private readonly ratingRepository: RatingRepository,
  ) {}

  async createRating(
    ratingData: CreateUpdateRatingDto,
    sellerEmail: string,
    buyerEmail: string,
  ): Promise<Rating> {
    return await this.ratingRepository.create(
      ratingData,
      sellerEmail,
      buyerEmail,
    );
  }

  async getAllRatings(): Promise<Rating[]> {
    return await this.ratingRepository.find({});
  }

  async getSingleRating(ratingId: string): Promise<Rating> {
    try {
      return await this.ratingRepository.findOne({ _id: ratingId });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  async updateRating(
    ratingId: string,
    ratingUpdates: CreateUpdateRatingDto,
  ): Promise<Rating> {
    try {
      return await this.ratingRepository.findOneAndUpdate(
        { _id: ratingId },
        ratingUpdates,
        { new: true },
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; 
    }
  }

  async removeRating(ratingId: string): Promise<SuccessResponse> {
    await this.ratingRepository.deleteOne({
      _id: ratingId,
    });
    return { success: true };
  }
}
