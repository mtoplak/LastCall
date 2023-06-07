export interface IBuyer {
	_id?: string;
	name: string;
	surname: string;
	email: string;
	legalPerson: boolean;
	address: string;
	city: string;
	country: string;
	phone: string;
	targetedMarket: string;
	title: string;
	registerNumber: number;
	orders: any[];
	basket: any[];
}
