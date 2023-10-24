import { IDrink } from "models/drink";

export const calculateTotalPrice = (products: IDrink[]): number => {
    let totalPrice = 0;

    for (const product of products) {
      totalPrice += product.actualPrice;
    }
  
    return totalPrice;
  };