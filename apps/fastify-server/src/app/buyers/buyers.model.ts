import * as mongoose from 'mongoose';
import { Product } from '../products/product.model';

const schema = mongoose.Schema;

export const BuyerSchema = new schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    legalPerson: { type: String, required: true},
    title: { type: String, required: true },
    registerNumber: { type: Number, required: true },
    targetedMarket: { type: String, required: true },
    address: { type: String, required: true}, //array naredi
    city: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    orders: [{type: schema.Types.ObjectId, ref: "Order"}],
    basket: [{
        productId: { type: schema.Types.ObjectId, ref: "Product", required: false },
        quantity: { type: Number, required: true, default: 1 }
      }],
});

export interface Buyer extends mongoose.Document {
    id: string;
    name: string;
    surname: string;
    legalPerson: boolean;
    title: string;
    registerNumber: number;
    targetedMarket: string;
    address: string; //array
    city: string;
    country: string;
    phone: string;
    email: string;
    password: string;
    orders: string[];
    basket: { productId: Product, quantity: number; }[];
}

export const BuyerModel: mongoose.Model<Buyer> = mongoose.model<Buyer>("Buyer", BuyerSchema);