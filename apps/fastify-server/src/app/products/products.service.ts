import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>,
    ) {}

    async insertProduct(
        title: string,
        description: string,
        packaging: string,
        size: string,
        price: number,
        stock: number
        ) {
        const newProduct = new this.productModel({
            title,
            description,
            packaging, //?
            size,
            price,
            stock,
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
            title: prod.title,
            description: prod.description,
            packaging: prod.packaging,
            size: prod.size,
            price: prod.price,
            stock: prod.stock,
        }));
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        if (!product) {
            throw new NotFoundException('Ne najdem produkta.');
        }
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            packaging: product.packaging,
            size: product.size,
            price: product.price,
            stock: product.stock,
        };
    }

    async updateProduct(
        productId: string,
        title: string,
        description: string,
        packaging: string,
        size: string,
        price: number,
        stock: number
    ) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (packaging) {
            updatedProduct.packaging = packaging;
        }
        if (size) {
            updatedProduct.size = size;
        }
        if (price) {
            updatedProduct.price = price;
        }
        if (stock) {
            updatedProduct.stock = stock;
        }
        updatedProduct.save();
    }

    async deleteProduct(productId: string) {
        const result = await this.productModel.deleteOne({_id: productId}).exec(); //v bazi je id shranjen kot _id
        console.log(result);
        if(result.deletedCount === 0){
            throw new NotFoundException('Could not find the product.');
        }
    }

    private async findProduct(productId: string): Promise<Product> {
        let product;
        try{
            product = await this.productModel.findById(productId).exec();
        } catch (error) {
            throw new NotFoundException('Could not find the product.');
        }
        if (!product) {
            throw new NotFoundException('Could not find the product.');
        }
        return product;
        //return { id: product.id, naziv: product.naziv, opis: product.opis, cena: product.cena};
    }
}