import { Injectable } from "@nestjs/common";
import { ProductResponse } from "src/data.response";
import { Product } from "./product.model";

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
      picture: product.picture,
      actualPrice: product.actualPrice,
      discount: product.discount,
    };
    return response;
  }
}