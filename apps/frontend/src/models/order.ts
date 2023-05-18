import { IBuyer } from "./buyer";
import { IDrink } from "./drink";
import { ISeller } from "./seller";

export interface IOrder {
    id: string;
    products: IDrink[];
    total: number;
    dateOfPurchase: Date;
    dateOfDelivery: Date;
    address: string;
    city: string;
    country: string;
    seller: ISeller;
    buyer: IBuyer;
}