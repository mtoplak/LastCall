import { Schema, Document, Model, model } from 'mongoose';
import { Order } from '../orders/order.model';

export const SellerSchema = new Schema({
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
    orders: [{type: Schema.Types.ObjectId, ref: "Order"}],
    products: [{type: Schema.Types.ObjectId, ref: "Product"}],
});

export interface Seller extends Document {
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
    orders: string[];
    products: string[];
}

export const SellerModel: Model<Seller> = model<Seller>("Seller", SellerSchema);