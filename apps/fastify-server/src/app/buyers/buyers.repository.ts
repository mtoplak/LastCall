import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Product } from "../products/product.model";
import { Buyer } from "./buyers.model";

@Injectable()
export class BuyersRepository {
    constructor(
        @InjectModel('Buyer') private readonly buyerModel: Model<Buyer>,
        @InjectModel('Product') private readonly productModel: Model<Product>,
      ) {}
    
      async findOne(buyerFilterQuery: FilterQuery<Buyer>): Promise<Buyer> {
        return await this.buyerModel
          .findOne(buyerFilterQuery)
          .populate('orders')
          .populate({ path: 'basket.productId', model: 'Product' })
          .exec();
      }
    
      async find(buyersFilterQuery: FilterQuery<Buyer>): Promise<Buyer[]> {
        return await this.buyerModel
          .find(buyersFilterQuery)
          .populate('orders')
          .populate({ path: 'basket.productId', model: 'Product' })
          .exec();
      }
    
      async create(
        buyerData: Partial<Buyer>,
        productData: { productId: string; quantity: number }[],
      ): Promise<Buyer> {
        const { ...restBuyerData } = buyerData;
        const productIds = productData.map((item) => item.productId);
        const quantities = productData.map((item) => item.quantity);
        if (!productIds || productIds.length === 0) {
          throw new NotFoundException('There are no products in this cart');
        }
        const products = await this.productModel.find({ _id: { $in: productIds } });
        if (products.length !== productIds.length) {
          throw new NotFoundException('Products for this cart not found');
        }    
        const productsInBasket = products.map((product, index) => ({
            productId: product._id,
            quantity: quantities[index],
          }));
      
          const newBuyer = new this.buyerModel({
            ...restBuyerData,
            basket: productsInBasket,
          });

        return await newBuyer.save();
      }
    
      async findOneAndUpdate(
        buyerFilterQuery: FilterQuery<Buyer>,
        buyer: Partial<Buyer>,
      ): Promise<Buyer> {
        return await this.buyerModel.findOneAndUpdate(buyerFilterQuery, buyer);
      }
    
      async deleteOne(
        buyerFilterQuery: FilterQuery<Buyer>,
      ): Promise<{ success: boolean }> {
        await this.buyerModel.deleteOne(buyerFilterQuery);
        return { success: true };
      }
}