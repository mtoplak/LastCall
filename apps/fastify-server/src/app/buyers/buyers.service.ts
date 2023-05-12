import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { Buyer } from "./buyers.model";

@Injectable()
export class BuyersService {

    constructor(@InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
    ) {}

    async addBuyer(
        name: string,
        surname: string,
        legalPerson: boolean,
        title: string,
        registerNumber: number,
        targetedMarket: string,
        address: string, //array
        city: string,
        country: string,
        phone: string,
        email: string,
        password: string,
        ) {
        const newBuyer = new this.buyerModel({
            name,
            surname,
            legalPerson,
            title,
            registerNumber,
            targetedMarket,
            address, //array
            city,
            country,
            phone,
            email,
            password,
        });
        const result = await newBuyer.save();
        console.log(result);
        return result.id as string;
    }

    async getAllBuyers() {
        const buyers = await this.buyerModel.find().exec();
        return buyers.map((buyer) => ({
            id: buyer.id,
            name: buyer.name,
            surname: buyer.surname,
            legalPerson: buyer.legalPerson,
            title: buyer.title,
            registerNumber: buyer.registerNumber,
            targetedMarket: buyer.targetedMarket,
            address: buyer.address, //array
            city: buyer.city,
            country: buyer.country, //? caches.getCountry(buyer.country,
            phone: buyer.phone,
            email: buyer.email,
            password: buyer.password,
        }));
    }

    async getSingleBuyer(productId: string) {
        const buyer = await this.findBuyer(productId);
        if (!buyer) {
            throw new NotFoundException('Could not find the buyer.');
        }
        return {
            id: buyer.id,
            name: buyer.name,
            surname: buyer.surname,
            legalPerson: buyer.legalPerson,
            title: buyer.title,
            registerNumber: buyer.registerNumber,
            targetedMarket: buyer.targetedMarket,
            address: buyer.address, //array
            city: buyer.city,
            country: buyer.country, //? caches.getCountry(buyer.country,
            phone: buyer.phone,
            email: buyer.email,
            password: buyer.password,
        };
    }

    async updateBuyer(
        buyerId: string,
        name: string,
        surname: string,
        legalPerson: boolean,
        title: string,
        registerNumber: number,
        targetedMarket: string,
        address: string, //array
        city: string,
        country: string,
        phone: string,
        email: string,
        password: string,
    ) {
        const updatedBuyer = await this.findBuyer(buyerId);
        if (name) {
            updatedBuyer.name = name;
        }
        if (surname) {
            updatedBuyer.surname = surname;
        }
        if (legalPerson) {
            updatedBuyer.legalPerson = legalPerson;
        }
        if (title) {
            updatedBuyer.title = title;
        }
        if (registerNumber) {
            updatedBuyer.registerNumber = registerNumber;
        }
        if (targetedMarket) {
            updatedBuyer.targetedMarket = targetedMarket;
        }
        if (address) {
            updatedBuyer.address = address;
        }
        if (city) {
            updatedBuyer.city = city;
        }
        if (country) {
            updatedBuyer.country = country;
        }
        if (phone) {
            updatedBuyer.phone = phone;
        }
        if (email) {
            updatedBuyer.email = email;
        }
        if (password) {
            updatedBuyer.password = password;
        }
        updatedBuyer.save();
    }

    async removeBuyer(buyerId: string) {
        const result = await this.buyerModel.deleteOne({_id: buyerId}).exec(); //v bazi je id shranjen kot _id
        console.log(result);
        if(result.deletedCount === 0){
            throw new NotFoundException('Could not find the buyer.');
        }
    }

    private async findBuyer(buyerId: string): Promise<Buyer> {
        let buyer;
        try{
            buyer = await this.buyerModel.findById(buyerId).exec();
        } catch (error) {
            throw new NotFoundException('Could not find the buyer.');
        }
        if (!buyer) {
            throw new NotFoundException('Could not find the buyer.');
        }
        return buyer;
    }
}