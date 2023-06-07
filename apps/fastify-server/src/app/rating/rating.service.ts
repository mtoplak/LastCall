import { Injectable, NotFoundException } from '@nestjs/common';
import { SuccessResponse } from 'src/data.response';
import { CreateUpdateRatingDto } from './create-update-rating.dto';
import { Rating } from './rating.model';
import { RatingRepository } from './rating.repository';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class RatingService {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly ordersService: OrdersService,
  ) {}

  async createRating(
    ratingData: CreateUpdateRatingDto,
    sellerId: string,
    buyerEmail: string,
    orderId: string,
  ): Promise<Rating> {
    const rating = await this.ratingRepository.create(
      ratingData,
      sellerId,
      buyerEmail,
    );

    if (orderId) {
      const order = await this.ordersService.getSingleOrder(orderId);
      if (order) {
        order.score = rating._id;
        await order.save();
      }
    }

    return rating;
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
    return await this.ratingRepository.deleteOne({ _id: ratingId });
  }

  async getSingleRatingByOrder(orderId: string): Promise<number> {
    try {
      const rating = await this.ratingRepository.findOne({ order: orderId });
      if (!rating) {
        throw new NotFoundException('Rating not found');
      }
      return rating.score;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw error;
    }
  }
}
