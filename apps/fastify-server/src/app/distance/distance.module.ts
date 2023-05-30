import { Module } from '@nestjs/common';
import { DistanceController } from './distance.controller';
import { DistanceService } from './distance.service';
import { SellersRepository } from '../sellers/sellers.repository';
import { OrdersRepository } from '../orders/orders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from '../orders/order.model';
import { SellerSchema } from '../sellers/sellers.model';
import { BuyerSchema } from '../buyers/buyers.model';
import { ProductSchema } from '../products/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
    MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [DistanceController],
  providers: [DistanceService, SellersRepository, OrdersRepository],
})
export class DistanceModule {}
