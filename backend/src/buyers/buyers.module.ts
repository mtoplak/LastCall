import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { BuyerSchema } from "./buyers.model";
import { BuyerController } from "./buyers.controller";
import { BuyerService } from "./buyers.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema}])], //injectalo bo module v katerikoli file ki ga rabi
    controllers: [BuyerController],
    providers: [BuyerService]
})
export class BuyerModule {
}