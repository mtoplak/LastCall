import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { BuyerSchema } from "./buyers.model";
import { BuyersController } from "./buyers.controller";
import { BuyersService } from "./buyers.service";
import { ProductSchema } from "../products/product.model";
import { BuyersRepository } from "./buyers.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema}]),
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}])
    ], //injectalo bo module v katerikoli file ki ga rabi
    controllers: [BuyersController],
    providers: [BuyersService, BuyersRepository]
})
export class BuyersModule {
}