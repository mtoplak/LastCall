import { Buyer } from './app/buyers/buyers.model';
import { Product } from './app/products/product.model';
import { Seller } from './app/sellers/sellers.model';

export interface ProductResponse {
  id: string;
  title: string;
  drinkCategory: string;
  packaging: string;
  size: string;
  price: number;
  stock: number;
  seller: Seller;
  sale: number;
  picture: string;
}

export interface BuyerResponse {
  id: string;
  name: string;
  surname: string;
  legalPerson: boolean;
  title: string;
  registerNumber: number;
  targetedMarket: string;
  address: string; //array
  city: string;
  country: string;
  phone: string;
  email: string;
  orders: string[];
  cart: { productId: Product; quantity: number }[];
}

export interface OrderResponse {
  id: string;
  products: { productId: Product; quantity: number }[];
  buyer: Buyer;
  seller: Seller;
  totalPrice: number;
  dateOfPurchase: Date;
  lastDateOfDelivery: Date;
  address: string;
  city: string;
  country: string;
}

export interface SellerResponse {
  id: string;
  name: string;
  surname: string;
  title: string;
  address: string; //array naredi
  city: string; //array naredi
  country: string; //array naredi
  registerNumber: number;
  tip: string;
  targetedMarket: string;
  phone: string;
  website: string;
  email: string;
  orders: string[];
  products: string[];
  coordinates: number[];
}
