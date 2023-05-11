import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { Buyer } from "./buyers.model";

@Injectable()
export class BuyerService {

    constructor(@InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
    ) {}

    async addBuyer(ime: string, priimek: string, naslov: string) {
        const newBuyer = new this.buyerModel({
            ime,
            priimek,
            naslov
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
            naslov: buyer.naslov
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
            naslov: buyer.naslov
        };
    }

    async updateBuyer(
        buyerId: string,
        ime: string,
        priimek: string,
        naslov: string
    ) {
        const updatedBuyer = await this.findBuyer(buyerId);
        if (ime) {
            updatedBuyer.ime = ime;
        }
        if (priimek) {
            updatedBuyer.priimek = priimek;
        }
        if (naslov) {
            updatedBuyer.naslov = naslov;
        }
        updatedBuyer.save();
    }

    async removeBuyer(productId: string) {
        const result = await this.buyerModel.deleteOne({_id: productId}).exec(); //v bazi je id shranjen kot _id
        console.log(result);
        if(result.deletedCount === 0){
            throw new NotFoundException('Ne najdem kupca.');
        }
    }

    private async findBuyer(productId: string): Promise<Buyer> {
        let product;
        try{
            product = await this.buyerModel.findById(productId).exec();
        } catch (error) {
            throw new NotFoundException('Ne najdem kupca.');
        }
        if (!product) {
            throw new NotFoundException('Ne najdem kupca.');
        }
        return product;
    }
}