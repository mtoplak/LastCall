import { IBuyer } from "./buyer";
import { IOrder } from "./order";
import { ISeller } from "./seller";

export interface IRating {
    seller: ISeller;
    buyer: IBuyer;
    order: IOrder;
    score: number;
}