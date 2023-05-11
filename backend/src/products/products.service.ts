import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>,
    ) {}

    async insertProduct(naziv: string, opis: string, cena: number) {
        const newProduct = new this.productModel({
            naziv,
            opis,
            cena
        });
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }

    async getAllProducts() {
        const products = await this.productModel.find().exec();
        //return products as Product[];
        return products.map((prod) => ({
            id: prod.id,
            naziv: prod.naziv,
            opis: prod.opis,
            cena: prod.cena}));
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        if (!product) {
            throw new NotFoundException('Ne najdem produkta.');
        }
        return {
            id: product.id,
            naziv: product.naziv,
            opis: product.opis,
            cena: product.cena};
    }

    async updateProduct(
        productId: string,
        naziv: string,
        opis: string,
        cena: number
    ) {
        const updatedProduct = await this.findProduct(productId);
        if (naziv) {
            updatedProduct.naziv = naziv;
        }
        if (opis) {
            updatedProduct.opis = opis;
        }
        if (cena) {
            updatedProduct.cena = cena;
        }
        updatedProduct.save();
    }

    async deleteProduct(productId: string) {
        const result = await this.productModel.deleteOne({_id: productId}).exec(); //v bazi je id shranjen kot _id
        console.log(result);
        if(result.deletedCount === 0){
            throw new NotFoundException('Ne najdem produkta.');
        }
    }

    private async findProduct(productId: string): Promise<Product> {
        let product;
        try{
            product = await this.productModel.findById(productId).exec();
        } catch (error) {
            throw new NotFoundException('Ne najdem produkta.');
        }
        if (!product) {
            throw new NotFoundException('Ne najdem produkta.');
        }
        return product;
        //return { id: product.id, naziv: product.naziv, opis: product.opis, cena: product.cena};
    }
}