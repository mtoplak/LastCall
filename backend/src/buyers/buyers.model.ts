import * as mongoose from 'mongoose';

export const BuyerSchema = new mongoose.Schema({
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
}