import * as mongoose from 'mongoose';

export const BuyerSchema = new mongoose.Schema({
    ime: { type: String, required: true },
    priimek: { type: String, required: true },
    pravnaOseba: { type: Boolean, required: true },
    nazivPodjetja: { type: String, required: true },
    davcnaStevilka: { type: Number, required: true },
    naslov: { type: String, required: true },
    mesto: { type: String, required: true },
    drzava: { type: String, required: true },
    ciljniTrg: { type: String, required: true },
    email: { type: String, required: true },
    telefon: { type: String, required: true },
});

export interface Buyer extends mongoose.Document {
    id: string;
    ime: string;
    priimek: string;
    pravnaOseba: boolean;
    nazivPodjetja: string;
    davcnaStevilka: number;
    naslov: string;
    mesto: string;
    drzava: string;
    ciljniTrg: string;
    email: string;
    telefon: string;
}