import { Injectable } from '@nestjs/common';
import { Product } from './app/products/product.model';
import { BuyerResponse, OrderResponse, ProductResponse, SellerResponse } from './data.response';
import { Buyer } from './app/buyers/buyers.model';
import { Order } from './app/orders/order.model';
import { Seller } from './app/sellers/sellers.model';

@Injectable()
export class ProductMapper {
  mapToResponse(product: Product): ProductResponse {
    const response: ProductResponse = {
      id: product.id,
      title: product.title,
      drinkCategory: product.drinkCategory,
      packaging: product.packaging,
      size: product.size,
      price: product.price,
      stock: product.stock,
      seller: product.seller,
      sale: product.sale,
      picture: product.picture
    };
    return response;
  }
}

@Injectable()
export class BuyerMapper {
  mapToResponse(buyer: Buyer): BuyerResponse {
    const response: BuyerResponse = {
      id: buyer.id,
      name: buyer.name,
      surname: buyer.surname,
      legalPerson: buyer.legalPerson,
      title: buyer.title,
      registerNumber: buyer.registerNumber,
      targetedMarket: buyer.targetedMarket,
      address: buyer.address,
      city: buyer.city,
      country: buyer.country,
      phone: buyer.phone,
      email: buyer.email,
      orders: buyer.orders,
      basket: buyer.basket,
    };
    return response;
  }
}

@Injectable()
export class OrderMapper {
  mapToResponse(order: Order): OrderResponse {
    const response: OrderResponse = {
      id: order.id,
      products: order.products,
      buyer: order.buyer,
      seller: order.seller,
      totalPrice: order.totalPrice,
      dateOfPurchase: order.dateOfPurchase,
      lastDateOfDelivery: order.lastDateOfDelivery,
      address: order.address,
      city: order.city,
      country: order.country,
    };
    return response;
  }
}

@Injectable()
export class SellerMapper {
  mapToResponse(seller: Seller): SellerResponse {
    const response: SellerResponse = {
      id: seller.id,
      name: seller.name,
      surname: seller.surname,
      title: seller.title,
      address: seller.address, //array naredi
      city: seller.city, //array naredi
      country: seller.country, //array naredi
      registerNumber: seller.registerNumber,
      tip: seller.tip,
      targetedMarket: seller.targetedMarket,
      phone: seller.phone,
      website: seller.website,
      email: seller.email,
      orders: seller.orders,
      products: seller.products,
      coordinates: seller.coordinates
    };
    return response;
  }
}