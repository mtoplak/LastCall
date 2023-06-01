import { Injectable } from "@nestjs/common";
import { BuyerResponse } from "src/data.response";
import { Buyer } from "./buyers.model";

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
      targetedMarkets: buyer.targetedMarkets,
      address: buyer.address,
      city: buyer.city,
      country: buyer.country,
      phone: buyer.phone,
      email: buyer.email,
      orders: buyer.orders,
      cart: buyer.cart,
    };
    return response;
  }
}