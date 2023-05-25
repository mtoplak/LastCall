import { IBuyer } from './buyer';
import { ICartItem } from './cartItem';
import { IDrink } from './drink';
import { ISeller } from './seller';

export interface IOrder {
	_id: string;
	products: ICartItem[];
	totalPrice: number;
	dateOfPurchase: Date;
	lastDateOfDelivery: Date;
	address: string;
	city: string;
	country: string;
	seller: ISeller;
	buyer: IBuyer;
    status: string;
}
