import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { SellersController } from "./sellers.controller";
import { SellerSchema } from "./sellers.model";
import { SellersService } from "./sellers.service";
import { ProductSchema } from "../products/product.model";
import { OrderSchema } from "../orders/order.model";
import { SellersRepository } from "./sellers.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
        MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    ], //injectalo bo module v katerikoli file ki ga rabi
    controllers: [SellersController],
    providers: [SellersService, SellersRepository]
})

export class SellersModule {
}
