import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose/dist';
import mongoose, { Model } from 'mongoose';
import { Order } from "./order.model";
import { title } from "process";
import { Product } from "../products/product.model";
import { Seller } from "../sellers/sellers.model";
import { Buyer } from "../buyers/buyers.model";

@Injectable()
export class OrdersService {

    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>,
        @InjectModel('Seller') private readonly sellerModel: Model<Seller>,
        @InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) {}

    async addOrder(
        productIds: string[] | undefined,
        buyerId: string,
        sellerId: string,
        totalPrice: number,
        lastDateOfDelivery: Date,
        address: string,
        city: string,
        country: string,
      ) {
        /*
        if (!productIds || productIds.length === 0) {
          throw new NotFoundException('Products not found');
        }
        */
        const products = await this.productModel.find({ _id: { $in: productIds } });
        if (products.length !== productIds.length) {
          throw new NotFoundException('Products not found');
        }
      
        const seller = await this.sellerModel.findById(sellerId);
        if (!seller) {
          throw new NotFoundException('Seller not found');
        }
      
        const buyer = await this.buyerModel.findById(buyerId);
        if (!buyer) {
          throw new NotFoundException('Buyer not found');
        }
      
        const newOrder = new this.orderModel({
          products: products.map((product) => product._id),
          buyer: buyer._id,
          seller: seller._id,
          totalPrice,
          lastDateOfDelivery,
          address,
          city,
          country,
        });
      
        const result = await newOrder.save();
      
        // Update the products' orders array
        for (const product of products) {
          product.orders.push(result._id);
          await product.save();
        }
      
        // Update the seller's and buyer's orders array
        seller.orders.push(result._id);
        await seller.save();

        buyer.orders.push(result._id);
        await buyer.save();
      
        console.log(result);
        return result.id as string;
      }
      

    async getAllOrders() {
        const orders = await this.orderModel.find().exec();
        return orders.map((order) => ({
            id: order.id,
            products: order.products,
            buyer: order.buyer,
            seller: order.seller,
            totalPrice: order.totalPrice,
            dateOfPurchase: order.dateOfPurchase,
            lastDateOfDelivery: order.lastDateOfDelivery,
            address: order.address,
            city: order.city,
            country: order.country,
        }));
    }

    async getSingleOrder(productId: string) {
        const order = await this.findOrder(productId);
        if (!order) {
            throw new NotFoundException('Could not find the order.');
        }
        return {
            id: order.id,
            products: order.products,
            buyer: order.buyer,
            seller: order.seller,
            totalPrice: order.totalPrice,
            dateOfPurchase: order.dateOfPurchase,
            lastDateOfDelivery: order.lastDateOfDelivery,
            address: order.address,
            city: order.city,
            country: order.country,
        };
    }

    async updateOrder(
        orderId: string,
        products: string[],
        buyer: Buyer,
        seller: Seller,
        totalPrice: number,
        lastDateOfDelivery: Date,
        address: string,
        city: string,
        country: string,
    ) {
        const updatedOrder = await this.findOrder(orderId);
        
        updatedOrder.products = products || updatedOrder.products;
        updatedOrder.buyer = buyer || updatedOrder.buyer;
        updatedOrder.seller = seller || updatedOrder.seller;
        updatedOrder.totalPrice = totalPrice || updatedOrder.totalPrice;
        updatedOrder.lastDateOfDelivery = lastDateOfDelivery || updatedOrder.lastDateOfDelivery;
        updatedOrder.address = address || updatedOrder.address;
        updatedOrder.city = city || updatedOrder.city;
        updatedOrder.country = country || updatedOrder.country;

        updatedOrder.save();
    }

    async removeOrder(orderId: string) {
        const result = await this.orderModel.deleteOne({_id: orderId}).exec(); //v bazi je id shranjen kot _id
        console.log(result);
        if(result.deletedCount === 0){
            throw new NotFoundException('Could not find the order.');
        }
    }

    private async findOrder(orderId: string): Promise<Order> {
        let order;
        try{
            order = await this.orderModel.findById(orderId).exec();
        } catch (error) {
            throw new NotFoundException('Could not find the order.');
        }
        if (!order) {
            throw new NotFoundException('Could not find the order.');
        }
        return order;
    }
}