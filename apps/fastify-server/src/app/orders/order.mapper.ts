import { Injectable } from "@nestjs/common";
import { OrderResponse } from "src/data.response";
import { Order } from "./order.model";

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
      status: order.status,
      uid: order.uid,
      coordinates: order.coordinates,
      score: order.score
    };
    return response;
  }
}