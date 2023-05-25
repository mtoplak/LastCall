import { Schema, Document, Model, model } from 'mongoose';

export const SellerSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  title: { type: String, required: true },
  address: { type: String, required: true }, //array naredi
  city: { type: String, required: true },
  country: { type: String, required: true },
  registerNumber: { type: Number, required: true },
  companyType: { type: String, required: true },
  targetedMarkets: [{ type: String }],
  phone: { type: String, required: true },
  website: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  coordinates: [{ type: Number }],
  maxDistance: { type: Number },
  minPrice: { type: Number },
  deliveryCost: { type: Number }
});

export interface Seller extends Document {
  name: string;
  surname: string;
  title: string;
  address: string; //array naredi
  city: string; //array naredi
  country: string; //array naredi
  registerNumber: number;
  companyType: string;
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
}

export const SellerModel: Model<Seller> = model<Seller>('Seller', SellerSchema);
