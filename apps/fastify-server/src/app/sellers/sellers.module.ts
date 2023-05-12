import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { SellersController } from "./sellers.controller";
import { SellerSchema } from "./sellers.model";
import { SellersService } from "./sellers.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema}])], //injectalo bo module v katerikoli file ki ga rabi
    controllers: [SellersController],
    providers: [SellersService]
})
export class SellersModule {
}