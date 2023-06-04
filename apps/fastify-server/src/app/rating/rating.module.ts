import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { SellerSchema } from '../sellers/sellers.model';
import { SellersService } from '../sellers/sellers.service';
import { SellersRepository } from '../sellers/sellers.repository';
import { RatingController } from './rating.controller';
import { BuyersService } from '../buyers/buyers.service';
import { BuyersRepository } from '../buyers/buyers.repository';
import { RatingService } from './rating.service';
import { RatingRepository } from './rating.repository';
import { RatingSchema } from './rating.model';
import { BuyerSchema } from '../buyers/buyers.model';
import { ProductsRepository } from '../products/products.repository';
import { ProductSchema } from '../products/product.model';
import { OrdersService } from '../orders/orders.service';
import { OrdersRepository } from '../orders/orders.repository';
import { ProductsService } from '../products/products.service';
import { CartService } from '../cart/cart.service';
import { MailService } from '../mailer/mail.service';
import { OrderSchema } from '../orders/order.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema }]),
    MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  controllers: [RatingController],
  providers: [
    SellersService,
    SellersRepository, 
    BuyersService,
    BuyersRepository,
    RatingService,
    RatingRepository,
    ProductsService,
    ProductsRepository,
    OrdersService,
    OrdersRepository,
    CartService,
    MailService,
  ],
})
export class RatingModule {}