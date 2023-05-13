import * as mongoose from 'mongoose';
import { Order } from '../orders/order.model';

const schema = mongoose.Schema;

export const SellerSchema = new schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    title: { type: String, required: true },
    address: { type: String, required: true}, //array naredi
    city: { type: String, required: true },
    country: { type: String, required: true },
    registerNumber: { type: Number, required: true },
    tip: { type: String, required: true },
    targetedMarket: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    orders: [{type: schema.Types.ObjectId, ref: "Order"}],
    products: [{type: schema.Types.ObjectId, ref: "Product"}],
});

export interface Seller extends mongoose.Document {
    id: string;
    name: string;
    surname: string;
    title: string;
    address: string; //array naredi
    city: string; //array naredi
    country: string; //array naredi
    registerNumber: number;
    tip: string;
    targetedMarket: string;
    phone: string;
    website: string;
    email: string;
    password: string;
    orders: string[];
    products: string[];
}

export const SellerModel: mongoose.Model<Seller> = mongoose.model<Seller>("Seller", SellerSchema);