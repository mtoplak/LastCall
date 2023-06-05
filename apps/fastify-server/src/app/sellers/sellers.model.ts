import { Schema, Document, Model, model } from 'mongoose';
import { SellerType } from './seller-type.enum';

export const SellerSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  title: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  registerNumber: { type: Number, required: true },
  companyType: {
    type: String,
    required: true,
    enum: Object.values(SellerType),
  },
  targetedMarkets: [{ type: String }],
  phone: { type: String, required: true },
  website: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  coordinates: [{ type: Number }],
  maxDistance: { type: Number },
  minPrice: { type: Number },
  deliveryCost: { type: Number },
  scores: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
  averageScore: { type: Number, default: 0 },
});

export interface Seller extends Document {
  name: string;
  surname: string;
  title: string;
  address: string;
  city: string;
  country: string;
  registerNumber: number;
  companyType: SellerType;
  targetedMarkets: string[];
  phone: string;
  website: string;
  email: string;
  orders: string[];
  products: string[];
  coordinates: number[];
  maxDistance: number;
  minPrice: number;
  deliveryCost: number;
  scores: string[];
  averageScore: number;
}

export const SellerModel: Model<Seller> = model<Seller>('Seller', SellerSchema);
