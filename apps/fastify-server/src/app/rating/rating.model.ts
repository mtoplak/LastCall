import { Schema, Document, Model, model, Types } from 'mongoose';
import { Seller } from '../sellers/sellers.model';
import { Buyer } from '../buyers/buyers.model';

export const RatingSchema = new Schema({
  seller: {
    type: Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  buyer: {
    type: Types.ObjectId,
    ref: 'Buyer',
    required: true, 
  },
  score: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

export interface Rating extends Document {
  seller: Seller;
  buyer: Buyer;
  score: number;
}

export const RatingModel: Model<Rating> = model<Rating>('Rating', RatingSchema);
export type RatingDocument = Rating & Document;
