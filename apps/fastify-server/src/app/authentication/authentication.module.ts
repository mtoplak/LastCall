import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { BuyerSchema } from '../buyers/buyers.model';
import { SellerSchema } from '../sellers/sellers.model';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthenticationRepository } from './authentication.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Buyer', schema: BuyerSchema }]),
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationRepository],
})
export class AuthenticationModule {}
