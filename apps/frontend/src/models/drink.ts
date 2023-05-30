import { ISeller } from "./seller";

export interface IDrink {
    _id: string;
    title: string;
    price: number;
    picture: string;
    drinkCategory: string;
    stock: number;
    size: string;
    packaging: string;
    seller: ISeller;
    percentage: number;
    salePrice: number;
}