import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from './rating.model';
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';
import { Seller } from '../sellers/sellers.model';
import { SellersService } from '../sellers/sellers.service';
import { Buyer } from '../buyers/buyers.model';
import { BuyersService } from '../buyers/buyers.service';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class RatingRepository {
  constructor(
    @InjectModel('Rating') private ratingModel: Model<Rating>,
    @InjectModel('Seller') private readonly sellerModel: Model<Seller>,
    @InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
    private readonly sellersService: SellersService,
    private readonly buyerService: BuyersService,
  ) {}

  async findOne(ratingFilterQuery: FilterQuery<Rating>): Promise<Rating> {
    try {
      return await this.ratingModel
        .findOne(ratingFilterQuery)
        .populate('seller')
        .exec();
    } catch (err) {
      throw new NotFoundException('Could not get the score.');
    }
  }

  async find(ratingsFilterQuery: FilterQuery<Rating>): Promise<Rating[]> {
    try {
      return await this.ratingModel
        .find(ratingsFilterQuery)
        .populate('seller')
        .exec();
    } catch (err) {
      throw new NotFoundException('Could not find the ratings.');
    }
  }

  async create(
    ratingData: Rating,
    sellerEmail: string,
    buyerEmail: string,
  ): Promise<Rating> {
    try {
      const { ...restRatingData } = ratingData;
      const seller = await this.sellersService.getSingleSellerByEmail(
        sellerEmail,
      );
      if (!seller) {
        throw new NotFoundException(
          `Could not find the seller with email ${sellerEmail}.`,
        );
      }
      const buyer = await this.buyerService.getSingleBuyerByEmail(buyerEmail);
      if (!buyer) {
        throw new NotFoundException(
          `Could not find the buyer with email ${buyerEmail}.`,
        );
      }

      const newRating = new this.ratingModel({
        ...restRatingData,
        seller: seller._id,
        buyer: buyer._id,
      });
      const result = await newRating.save();
      seller.scores.push(result._id);
      const average = await this.sellersService.calculateAverageScore(newRating.score, seller.email);
      seller.averageScore = average;
      await seller.save();
      return result;
    } catch (error) {
      console.error('Error creating rating:', error);
      return null;
    }
  }

  async findOneAndUpdate(
    ratingFilterQuery: FilterQuery<Rating>,
    ratingUpdates: UpdateQuery<Rating>,
    options?: QueryOptions,
  ): Promise<Rating> {
    try {
      return await this.ratingModel.findOneAndUpdate(
        ratingFilterQuery,
        ratingUpdates,
        options,
      );
    } catch (err) {
      throw new NotFoundException('Could not update the rating.');
    }
  }

  async deleteOne(ratingFilterQuery: FilterQuery<Rating>): Promise<void> {
    try {
      return await this.ratingModel.findOneAndDelete(ratingFilterQuery);
    } catch (err) {
      throw new NotFoundException('Could not delete the rating.');
    }
  }
}
