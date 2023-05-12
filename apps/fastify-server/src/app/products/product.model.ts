import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    packaging: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

export interface Product extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    packaging: string; 
    size: string;
    price: number;
    stock: number;
    //slike
}