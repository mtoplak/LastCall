import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { BuyerSchema } from './buyers.model';
import { BuyersController } from './buyers.controller';
import { BuyersService } from './buyers.service';
import { ProductSchema } from '../products/product.model';
import { BuyersRepository } from './buyers.repository';
import { ProductsRepository } from '../products/products.repository';
import { SellerSchema } from '../sellers/sellers.model';
import { SellersService } from '../sellers/sellers.service';
import { SellersRepository } from '../sellers/sellers.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
  ],
  controllers: [BuyersController],
  providers: [
    BuyersService,
    BuyersRepository,
    ProductsRepository,
    SellersService,
    SellersRepository,
  ],
})
export class BuyersModule {}
