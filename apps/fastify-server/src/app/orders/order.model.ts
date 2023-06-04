import { Schema, Document, Model, model } from 'mongoose';
import { Buyer } from '../buyers/buyers.model';
import { Product, ProductSchema } from '../products/product.model';
import { Seller } from '../sellers/sellers.model';
import { OrderStatus } from './order-status.enum';
import { Rating } from '../rating/rating.model';

export const OrderSchema = new Schema({
  products: [
    {
      product: { type: ProductSchema, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  buyer: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
  totalPrice: { type: Number, required: true },
  dateOfPurchase: { type: Date, immutable: true, default: () => Date.now() },
  lastDateOfDelivery: { type: Date, required: true },
  actualDateOfDelivery: { type: Date },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  status: { type: String, default: OrderStatus.PENDING, enum: Object.values(OrderStatus) },
  uid: { type: String, required: true },
  coordinates: [{ type: Number }],
  score: { type: Schema.Types.ObjectId, ref: 'Seller' }
});

export interface Order extends Document {
  products: { product: Product; quantity: number }[];
  buyer: Buyer;
  seller: Seller;
  totalPrice: number;
  dateOfPurchase: Date;
  lastDateOfDelivery: Date;
  actualDateOfDelivery: Date;
  address: string;
  city: string;
  country: string;
  status: OrderStatus;
  uid: string;
  coordinates: number[];
  score: Rating;
}

export const OrderModel: Model<Order> = model<Order>('Order', OrderSchema);
