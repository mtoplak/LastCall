import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { Order } from "../orders/order.model";
import { Seller } from "../sellers/sellers.model";

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
        @InjectModel('Order') private readonly orderModel: Model<Order>,
        @InjectModel('Seller') private readonly sellerModel: Model<Seller>,
    ) {}

    async insertProduct(
        title: string,
        drinkCategory: string,
        packaging: string,
        size: string,
        price: number,
        stock: number,
        //orders: string[] | undefined, // Update the parameter name to 'orders'
        sellerId: string,
        sale: number
      ) {

        const seller = await this.sellerModel.findById(sellerId);
        if (!seller) {
          throw new NotFoundException('Seller not found');
        }

        const newProduct = new this.productModel({
          title,
          drinkCategory,
          packaging,
          size,
          price,
          stock,
          //orders: orders || [], // Assign the 'orders' parameter or an empty array if it's not provided
          seller: seller._id,
          sale
        });
      
        const result = await newProduct.save();
      
        seller.products.push(result._id);
        await seller.save();

        /*
        if (orders && orders.length > 0) {
          for (const orderId of orders) {
            const order = await this.orderModel.findById(orderId);
            if (!order) {
              throw new NotFoundException('Order not found');
            }
            order.products.push(result._id);
            await order.save();
          }
        }
       */

        console.log(result);
        return result.id as string;
      }
      
    async getAllProducts() {
        const products = await this.productModel.find().populate('seller').exec();
        //return products as Product[];
        return products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            drinkCategory: prod.drinkCategory,
            packaging: prod.packaging,
            size: prod.size,
            price: prod.price,
            stock: prod.stock,
            //orders: prod.orders,
            seller: prod.seller,
            sale: prod.sale,
        }));
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        if (!product) {
            throw new NotFoundException('Product not found.');
        }
        return {
            id: product.id,
            title: product.title,
            drinkCategory: product.drinkCategory,
            packaging: product.packaging,
            size: product.size,
            price: product.price,
            stock: product.stock,
            //orders: product.orders,
            seller: product.seller,
            sale: product.sale
        };
    }

    async updateProduct(
        productId: string,
        title: string,
        drinkCategory: string,
        packaging: string,
        size: string,
        price: number,
        stock: number,
        //orders: string[],
        seller: Seller,
        sale: number,
    ) {
        const updatedProduct = await this.findProduct(productId);
        const updatedFields = {
            title,
            drinkCategory,
            packaging,
            size,
            price,
            stock,
            //orders,
            seller,
            sale
          };
          
          for (const [key, value] of Object.entries(updatedFields)) {
            if (value) {
              updatedProduct[key] = value;
            }
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
            product = await this.productModel.findById(productId).populate('seller').exec();
        } catch (error) {
            throw new NotFoundException('Could not find the product.');
        }
        if (!product) {
            throw new NotFoundException('Could not find the product.');
        }
        return product;
    }
}