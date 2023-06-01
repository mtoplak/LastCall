import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSchema } from './product.model';
import { OrderSchema } from '../orders/order.model';
import { SellerSchema } from '../sellers/sellers.model';
import { ProductsRepository } from './products.repository';
import { SellersService } from '../sellers/sellers.service';
import { SellersRepository } from '../sellers/sellers.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsRepository,
    SellersService,
    SellersRepository,
    ProductsService,
  ],
})
export class ProductsModule {}
