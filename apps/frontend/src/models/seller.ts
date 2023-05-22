export interface ISeller {
	_id: string;
	name: string;
	surname: string;
	email: string;
	title: string;
	country: string;
	city: string;
	address: string;
	registerNumber: number;
	tip: string; // spremeni v type
	phone: string;
	website: string;
	targetedMarket: string;
	coordinates: number[];
	orders: any[];
	products: any[];
}
