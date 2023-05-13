import * as mongoose from 'mongoose';
import { Buyer } from '../buyers/buyers.model';
import { Product } from '../products/product.model';
import { Seller } from '../sellers/sellers.model';

const schema = mongoose.Schema;

export const OrderSchema = new schema({
    products: [{type: schema.Types.ObjectId, ref: "Product", required: true}],
    buyer: { type: schema.Types.ObjectId, ref: "Buyer", required: true },
    seller: { type: schema.Types.ObjectId, ref: "Seller", required: true },
    totalPrice: { type: Number, required: true},
    dateOfPurchase: { type: Date, immutable: true, default: () => Date.now()},
    lastDateOfDelivery: { type: Date, required: true },
    address: { type: String, required: true}, //array naredi
    city: { type: String, required: true },
    country: { type: String, required: true },
});

export interface Order extends mongoose.Document {
    id: string;
    products: string[];
    buyer: Buyer;
    seller: Seller;
    totalPrice: number;
    dateOfPurchase: Date;
    lastDateOfDelivery: Date;
    address: string;
    city: string;
    country: string;
}

export const OrderModel: mongoose.Model<Order> = mongoose.model<Order>("Order", OrderSchema);