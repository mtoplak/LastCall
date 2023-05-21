import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { EmailRepository } from './email.repository';
import { BuyerSchema } from '../buyers/buyers.model';
import { SellerSchema } from '../sellers/sellers.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema }]),
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
  ], //injectalo bo module v katerikoli file ki ga rabi
  controllers: [EmailController],
  providers: [EmailService, EmailRepository],
})
export class EmailModule {}
