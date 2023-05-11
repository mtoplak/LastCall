import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    naziv: { type: String, required: true },
    opis: { type: String, required: true },
    cena: { type: Number, required: true },
});

export interface Product extends mongoose.Document {
    id: string;
    naziv: string;
    opis: string;
    cena: number;
}