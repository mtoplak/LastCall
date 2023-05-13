import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { Seller } from "./sellers.model";

@Injectable()
export class SellersService {

    constructor(@InjectModel('Seller') private readonly sellerModel: Model<Seller>,
    ) {}

    async addSeller(
        name: string,
        surname: string,
        title: string,
        address: string, //array naredi
        city: string, //array naredi
        country: string, //array naredi
        registerNumber: number,
        tip: string,
        targetedMarket: string,
        phone: string,
        website: string,
        email: string,
        password: string,
        ) {
        const newSeller = new this.sellerModel({
            name,
            surname,
            title,
            address, //array naredi
            city, //array naredi
            country, //array naredi
            registerNumber,
            tip,
            targetedMarket,
            phone,
            website,
            email,
            password,
        });
        const result = await newSeller.save();
        console.log(result);
        return result.id as string;
    }

    async getAllSellers() {
        const sellers = await this.sellerModel.find().exec();
        return sellers.map((seller) => ({
            id: seller.id,
            name: seller.name,
            surname: seller.surname,
            title: seller.title,
            address: seller.address, 
            city: seller.city,
            country: seller.country,
            registerNumber: seller.registerNumber,
            tip: seller.tip,
            targetedMarket: seller.targetedMarket,
            phone: seller.phone,
            website: seller.website,
            email: seller.email,
            password: seller.password,
            orders: seller.orders,
            products: seller.products
        }));
    }

    async getSingleSeller(sellerId: string) {
        const seller = await this.findSeller(sellerId);
        if (!seller) {
            throw new NotFoundException('Could not find the seller.');
        }
        return {
            id: seller.id,
            name: seller.name,
            surname: seller.surname,
            title: seller.title,
            address: seller.address, 
            city: seller.city,
            country: seller.country,
            registerNumber: seller.registerNumber,
            tip: seller.tip,
            targetedMarket: seller.targetedMarket,
            phone: seller.phone,
            website: seller.website,
            email: seller.email,
            password: seller.password,
            orders: seller.orders,
            products: seller.products
        };
    }

    async updateSeller(
        sellerId: string,
        name: string,
        surname: string,
        title: string,
        address: string, //array naredi
        city: string, //array naredi
        country: string, //array naredi
        registerNumber: number,
        tip: string,
        targetedMarket: string,
        phone: string,
        website: string,
        email: string,
        password: string,
    ) {
        const updatedSeller = await this.findSeller(sellerId);
        
        updatedSeller.name = name || updatedSeller.name;
        updatedSeller.surname = surname || updatedSeller.surname;
        updatedSeller.title = title || updatedSeller.title;
        updatedSeller.address = address || updatedSeller.address;
        updatedSeller.city = city || updatedSeller.city;
        updatedSeller.country = country || updatedSeller.country;
        updatedSeller.registerNumber = registerNumber || updatedSeller.registerNumber;
        updatedSeller.tip = tip || updatedSeller.tip;
        updatedSeller.targetedMarket = targetedMarket || updatedSeller.targetedMarket;
        updatedSeller.phone = phone || updatedSeller.phone;
        updatedSeller.website = website || updatedSeller.website;
        updatedSeller.email = email || updatedSeller.email;
        updatedSeller.password = password || updatedSeller.password;

        updatedSeller.save();
    }

    async removeSeller(sellerId: string) {
        const result = await this.sellerModel.deleteOne({_id: sellerId}).exec(); //v bazi je id shranjen kot _id
        console.log(result);
        if(result.deletedCount === 0){
            throw new NotFoundException('Could not find the seller.');
        }
    }

    private async findSeller(sellerId: string): Promise<Seller> {
        let seller;
        try{
            seller = await this.sellerModel.findById(sellerId).exec();
        } catch (error) {
            throw new NotFoundException('Could not find the seller.');
        }
        if (!seller) {
            throw new NotFoundException('Could not find the seller.');
        }
        return seller;
    }
}