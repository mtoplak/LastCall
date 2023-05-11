import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { config } from 'dotenv';
import { BuyersModule } from './buyers/buyers.module';
config();

const databaseHost = require("../constants").databaseHost;

@Module({
  imports: [
    BuyersModule,
    ProductsModule,
    MongooseModule.forRoot(databaseHost),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
