import { IBuyer } from "./buyer";
import { IDrink } from "./drink";
import { ISeller } from "./seller";

export interface IOrder {
    _id: string;
    products: IDrink[];
    status: string;
    totalPrice: number;
    dateOfPurchase: Date;
    dateOfDelivery: Date;
    address: string;
    city: string;
    country: string;
    seller: ISeller;
    buyer: IBuyer;
}