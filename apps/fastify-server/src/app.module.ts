import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './app/products/products.module';
import { BuyersModule } from './app/buyers/buyers.module';
import { SellersModule } from './app/sellers/sellers.module';
import { OrdersModule } from './app/orders/orders.module';
import { EmailModule } from './app/authentication/email.module';

const databaseHost = require('../constants').databaseHost;

@Module({
  imports: [
    BuyersModule,
    ProductsModule,
    SellersModule,
    OrdersModule,
    EmailModule,
    MongooseModule.forRoot(databaseHost),
    ConfigModule.forRoot({
      cache: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
