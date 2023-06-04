import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SuccessResponse } from 'src/data.response';
import { SellersRepository } from '../sellers/sellers.repository';
import { SellersService } from '../sellers/sellers.service';
import { ProductsRepository } from '../products/products.repository';
import { CreateUpdateRatingDto } from './create-update-rating.dto';
import { Rating } from './rating.model';
import { RatingRepository } from './rating.repository';
import { OrdersService } from '../orders/orders.service';
import { OrdersRepository } from '../orders/orders.repository';
import { Order } from '../orders/order.model';
//GET OCENO ENEGA SELLERJA (ID)
//ZRACUNAJ AVERAGE SCORE

@Injectable()
export class RatingService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly sellersRepository: SellersRepository,
    private readonly sellersService: SellersService,
    private readonly ratingRepository: RatingRepository,
    private readonly ordersService: OrdersService
  ) {}

  async createRating(
    ratingData: CreateUpdateRatingDto,
    sellerEmail: string,
    buyerEmail: string,
    orderId: string,
  ): Promise<Rating> {
    /*
    if (orderId) {
      const order = await this.ordersService.getSingleOrder(orderId);
      if (order && order.score) {
        throw new BadRequestException('Order already rated');
      }
    }
*/
    const rating = await this.ratingRepository.create(
      ratingData,
      sellerEmail,
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
    await this.ratingRepository.deleteOne({
      _id: ratingId,
    });
    return { success: true };
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
