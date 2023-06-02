import { Injectable } from "@nestjs/common";
import { SellerResponse } from "src/data.response";
import { Seller } from "./sellers.model";

@Injectable()
export class SellerMapper {
  mapToResponse(seller: Seller): SellerResponse {
    const response: SellerResponse = {
      id: seller.id,
      name: seller.name,
      surname: seller.surname,
      title: seller.title,
      address: seller.address,
      city: seller.city,
      country: seller.country,
      registerNumber: seller.registerNumber,
      companyType: seller.companyType,
      targetedMarkets: seller.targetedMarkets,
      phone: seller.phone,
      website: seller.website,
      email: seller.email,
      orders: seller.orders,
      products: seller.products,
      coordinates: seller.coordinates,
    };
    return response;
  }
}