import { Injectable } from "@nestjs/common";
import { RatingResponse } from "src/data.response";
import { Rating } from "./rating.model";

@Injectable()
export class RatingMapper {
  mapToResponse(rating: Rating): RatingResponse {
    const response: RatingResponse = {
      id: rating.id,
      seller: rating.seller,
      buyer: rating.buyer,
      order: rating.order,
      score: rating.score
    };
    return response;
  }
}