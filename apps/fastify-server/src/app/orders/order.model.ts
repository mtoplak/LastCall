import { Schema, Document, Model, model } from 'mongoose';
import { Buyer } from '../buyers/buyers.model';
import { Product } from '../products/product.model';
import { Seller } from '../sellers/sellers.model';

export const OrderSchema = new Schema({
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: false },
    quantity: { type: Number, required: true, default: 1 }
  }],
  buyer: { type: Schema.Types.ObjectId, ref: "Buyer", required: false },
  seller: { type: Schema.Types.ObjectId, ref: "Seller", required: false },
  totalPrice: { type: Number, required: true },
  dateOfPurchase: { type: Date, immutable: true, default: () => Date.now() },
  lastDateOfDelivery: { type: Date, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

export interface Order extends Document {
  id: string;
  products: { productId: Product, quantity: number; }[];
  buyer: Buyer;
  seller: Seller;
  totalPrice: number;
  dateOfPurchase: Date;
  lastDateOfDelivery: Date;
  address: string;
  city: string;
  country: string;
}

export const OrderModel: Model<Order> = model<Order>("Order", OrderSchema);
