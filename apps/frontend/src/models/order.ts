import { OrderStatus } from 'enums/order.enum';
import { IBuyer } from './buyer';
import { ICartItem } from './cartItem';
import { ISeller } from './seller';
import { IRating } from './rating';

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
	status: OrderStatus;
	uid: string;
	actualDateOfDelivery: Date;
	score: IRating
}
