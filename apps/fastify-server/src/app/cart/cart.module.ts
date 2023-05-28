import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { ProductSchema } from "../products/product.model";
import { ProductsRepository } from "../products/products.repository";
import { SellerSchema } from "../sellers/sellers.model";
import { BuyerSchema } from "../buyers/buyers.model";
import { BuyersRepository } from "../buyers/buyers.repository";
import { BuyersService } from "../buyers/buyers.service";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { ProductsService } from "../products/products.service";
import { SellersRepository } from "../sellers/sellers.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema}]),
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}]),
        MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema}])
    ], //injectalo bo module v katerikoli file ki ga rabi
    controllers: [CartController],
    providers: [CartService, BuyersService, BuyersRepository, ProductsRepository, ProductsService, SellersRepository]
})
export class CartModule {
}