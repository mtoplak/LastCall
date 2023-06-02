import { Injectable } from "@nestjs/common";
import { ProductResponse, RatingResponse } from "src/data.response";
import { Rating } from "./rating.model";

@Injectable()
export class RatingMapper {
  mapToResponse(rating: Rating): RatingResponse {
    const response: RatingResponse = {
      id: rating.id,
      seller: rating.seller,
      buyer: rating.buyer,
      score: rating.score
    };
    return response;
  }
}