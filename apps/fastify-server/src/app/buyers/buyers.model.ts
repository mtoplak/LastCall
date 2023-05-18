import { Schema, Document, Model, model } from 'mongoose';
import { Product } from '../products/product.model';


export const BuyerSchema = new Schema({
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
    orders: [{type: Schema.Types.ObjectId, ref: "Order"}],
    basket: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: false },
        quantity: { type: Number, required: true, default: 1 }
      }],
});

export interface Buyer extends Document {
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
    orders: string[];
    basket: { productId: Product, quantity: number; }[];
}

export const BuyerModel: Model<Buyer> = model<Buyer>("Buyer", BuyerSchema);