import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductSchema } from "./product.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema}])], //injectalo bo module v katerikoli file ki ga rabi
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {
}