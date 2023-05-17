import * as mongoose from 'mongoose';
import { Seller } from '../sellers/sellers.model';

const schema = mongoose.Schema;

export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    drinkCategory: { type: String, required: true },
    packaging: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    //orders: [{type: schema.Types.ObjectId, ref: "Order"}],
    seller: {type: schema.Types.ObjectId, ref: "Seller"},
    sale: { type: Number },
    picture: { type: String, required: true },
});

export interface Product extends mongoose.Document {
    id: string;
    title: string;
    drinkCategory: string;
    packaging: string; 
    size: string;
    price: number;
    stock: number;
    //orders: string[];
    seller: Seller;
    sale: number;
    //slike
    picture: string;
}

export const ProductModel: mongoose.Model<Product> = mongoose.model<Product>("Product", ProductSchema);