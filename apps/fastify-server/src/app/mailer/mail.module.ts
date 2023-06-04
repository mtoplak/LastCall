import { Module } from '@nestjs/common';
import { BuyersService } from '../buyers/buyers.service';
import { BuyersRepository } from '../buyers/buyers.repository';
import { ProductsRepository } from '../products/products.repository';
import { ProductsService } from '../products/products.service';
import { SellersService } from '../sellers/sellers.service';
import { SellersRepository } from '../sellers/sellers.repository';
import { MailService } from '../mailer/mail.service';
import { MailController } from './mail.controller';
import { BuyerSchema } from '../buyers/buyers.model';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from '../orders/order.model';
import { SellerSchema } from '../sellers/sellers.model';
import { ProductSchema } from '../products/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
    MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [MailController],
  providers: [
    MailService,
    BuyersService,
    SellersService,
    ProductsService,
    BuyersRepository,
    SellersRepository,
    ProductsRepository,
  ],
})

export class MailModule { }
