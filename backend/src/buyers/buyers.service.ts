import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { Buyer } from "./buyers.model";

@Injectable()
export class BuyersService {

    constructor(@InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
    ) {}

    async addBuyer(
        ime: string,
        priimek: string,
        pravnaOseba: boolean,
        nazivPodjetja: string,
        davcnaStevilka: number,
        naslov: string,
        mesto: string,
        drzava: string,
        ciljniTrg: string,
        email: string,
        telefon: string,
        ) {
        const newBuyer = new this.buyerModel({
            ime,
            priimek,
            pravnaOseba,
            nazivPodjetja,
            davcnaStevilka,
            naslov,
            mesto,
            drzava,
            ciljniTrg,
            email,
            telefon,
        });
        const result = await newBuyer.save();
        console.log(result);
        return result.id as string;
    }

    async getAllBuyers() {
        const buyers = await this.buyerModel.find().exec();
        return buyers.map((buyer) => ({
            id: buyer.id,
            ime: buyer.ime,
            priimek: buyer.priimek,
            pravnaOseba: buyer.pravnaOseba,
            nazivPodjetja: buyer.nazivPodjetja,
            davcnaStevilka: buyer.davcnaStevilka,
            naslov: buyer.naslov,
            mesto: buyer.mesto,
            drzava: buyer.drzava,
            ciljniTrg: buyer.ciljniTrg,
            email: buyer.email,
            telefon: buyer.telefon,
        }));
    }

    async getSingleBuyer(productId: string) {
        const buyer = await this.findBuyer(productId);
        if (!buyer) {
            throw new NotFoundException('Ne najdem kupca.');
        }
        return {
            id: buyer.id,
            ime: buyer.ime,
            priimek: buyer.priimek,
            pravnaOseba: buyer.pravnaOseba,
            nazivPodjetja: buyer.nazivPodjetja,
            davcnaStevilka: buyer.davcnaStevilka,
            naslov: buyer.naslov,
            mesto: buyer.mesto,
            drzava: buyer.drzava,
            ciljniTrg: buyer.ciljniTrg,
            email: buyer.email,
            telefon: buyer.telefon,
        };
    }

    async updateBuyer(
        buyerId: string,
        ime: string,
        priimek: string,
        pravnaOseba: boolean,
        nazivPodjetja: string,
        davcnaStevilka: number,
        naslov: string,
        mesto: string,
        drzava: string,
        ciljniTrg: string,
        email: string,
        telefon: string,
    ) {
        const updatedBuyer = await this.findBuyer(buyerId);
        if (ime) {
            updatedBuyer.ime = ime;
        }
        if (priimek) {
            updatedBuyer.priimek = priimek;
        }
        if (pravnaOseba) {
            updatedBuyer.pravnaOseba = pravnaOseba;
        }
        if (nazivPodjetja) {
            updatedBuyer.nazivPodjetja = nazivPodjetja;
        }
        if (davcnaStevilka) {
            updatedBuyer.davcnaStevilka = davcnaStevilka;
        }
        if (naslov) {
            updatedBuyer.naslov = naslov;
        }
        if (mesto) {
            updatedBuyer.mesto = mesto;
        }
        if (drzava) {
            updatedBuyer.drzava = drzava;
        }
        if (ciljniTrg) {
            updatedBuyer.ciljniTrg = ciljniTrg;
        }
        if (email) {
            updatedBuyer.email = email;
        }
        if (telefon) {
            updatedBuyer.telefon = telefon;
        }
        updatedBuyer.save();
    }

    async removeBuyer(buyerId: string) {
        const result = await this.buyerModel.deleteOne({_id: buyerId}).exec(); //v bazi je id shranjen kot _id
        console.log(result);
        if(result.deletedCount === 0){
            throw new NotFoundException('Ne najdem kupca.');
        }
    }

    private async findBuyer(buyerId: string): Promise<Buyer> {
        let buyer;
        try{
            buyer = await this.buyerModel.findById(buyerId).exec();
        } catch (error) {
            throw new NotFoundException('Ne najdem kupca.');
        }
        if (!buyer) {
            throw new NotFoundException('Ne najdem kupca.');
        }
        return buyer;
    }
}