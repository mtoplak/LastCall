import { SellerType } from "enums/seller.enum";

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
	companyType: SellerType;
	phone: string;
	website: string;
	targetedMarket: string;
	coordinates: number[];
	orders: any[];
	products: any[];
	maxDistance: number;
  	minPrice: number;
	deliveryCost: number;
	scores: string[];
	averageScore: number;
}
