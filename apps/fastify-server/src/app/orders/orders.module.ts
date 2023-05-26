import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { OrdersService } from './orders.service';
import { OrderSchema } from './order.model';
import { OrdersController } from './orders.controller';
import { SellerSchema } from '../sellers/sellers.model';
import { BuyerSchema } from '../buyers/buyers.model';
import { ProductSchema } from '../products/product.model';
import { OrdersRepository } from './orders.repository';
import { BuyersService } from '../buyers/buyers.service';
import { BuyersRepository } from '../buyers/buyers.repository';
import { ProductsRepository } from '../products/products.repository';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
    MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ], //injectalo bo module v katerikoli file ki ga rabi
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    BuyersService,
    BuyersRepository,
    ProductsService,
    ProductsRepository,
  ],
})
export class OrdersModule {}
