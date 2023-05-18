import { Schema, Document, Model, model } from 'mongoose';
import { Seller } from '../sellers/sellers.model';

export const ProductSchema = new Schema({
    title: { type: String, required: true },
    drinkCategory: { type: String, required: true },
    packaging: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    seller: {type: Schema.Types.ObjectId, ref: "Seller"},
    sale: { type: Number },
    picture: { type: String },
});

export interface Product extends Document {
    title: string;
    drinkCategory: string;
    packaging: string; 
    size: string;
    price: number;
    stock: number;
    seller: Seller;
    sale: number;
    picture: string;
}

export const ProductModel: Model<Product> = model<Product>("Product", ProductSchema);
export type ProductDocument = Product & Document;