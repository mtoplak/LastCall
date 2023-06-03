import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './app/products/products.module';
import { BuyersModule } from './app/buyers/buyers.module';
import { SellersModule } from './app/sellers/sellers.module';
import { OrdersModule } from './app/orders/orders.module';
import { AuthenticationModule } from './app/authentication/authentication.module';
import { CartModule } from './app/cart/cart.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { DistanceModule } from './app/distance/distance.module';
import { MailModule } from './app/mailer/mail.module';
import { RatingModule } from './app/rating/rating.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const databaseHost = require('../constants').databaseHost;

@Module({
  imports: [
    AppModule,
    BuyersModule,
    ProductsModule,
    SellersModule,
    OrdersModule,
    RatingModule,
    CartModule,
    AuthenticationModule,
    DistanceModule,
    DistanceModule,
    MailModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // Enable SSL encryption
        auth: {
          user: 'info.last.call.company@gmail.com',
          pass: process.env.MAILER_PASS,
        },
      },
    }),
    MongooseModule.forRoot(databaseHost, {
      useUnifiedTopology: true, // Add this option for unified topology
    }),
    ConfigModule.forRoot({
      cache: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // se ne uporablja zdaj
    /*consumer
      .apply(FirebaseAuthMiddleware)
      .forRoutes('/orders'); // Apply the middleware to these routes
    consumer
      .apply(FirebaseAuthMiddleware)
      .exclude(
        { path: 'seller', method: RequestMethod.ALL }, // Exclude all routes that start with 'seller'
      )
      .forRoutes({ path: 'sellers', method: RequestMethod.POST }); // Apply the middleware only to the POST method of /buyers route*/
  }
}
