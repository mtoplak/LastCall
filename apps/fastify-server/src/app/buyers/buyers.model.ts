import { Schema, Document, Model, model } from 'mongoose';
import { Product } from '../products/product.model';

export const BuyerSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  legalPerson: { type: Boolean, required: true },
  title: { type: String },
  registerNumber: { type: Number },
  targetedMarkets: [{ type: String }],
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  cart: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

export interface Buyer extends Document {
  name: string;
  surname: string;
  legalPerson: boolean;
  title: string;
  registerNumber: number;
  targetedMarkets: string[];
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  orders: string[];
  cart: { productId: Product; quantity: number }[];
}

export interface Cart {
  productId: string;
  quantity: number;
}

export const BuyerModel: Model<Buyer> = model<Buyer>('Buyer', BuyerSchema);
