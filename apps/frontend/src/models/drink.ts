import { ProductCategory } from "enums/product.enum";
import { ISeller } from "./seller";

export interface IDrink {
    _id: string;
    title: string;
    price: number;
    picture: string;
    drinkCategory: ProductCategory;
    stock: number;
    size: string;
    packaging: string;
    seller: ISeller;
    discount: number;
    actualPrice: number;
}