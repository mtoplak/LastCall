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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema }]),
    MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [RatingController],
  providers: [
    SellersService,
    SellersRepository, 
    BuyersService,
    BuyersRepository,
    RatingService,
    RatingRepository,
    ProductsRepository,
  ],
})
export class RatingModule {}
