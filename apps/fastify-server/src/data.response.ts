import { Buyer } from './app/buyers/buyers.model';
import { OrderStatus } from './app/orders/order-status.enum';
import { Order } from './app/orders/order.model';
import { Product } from './app/products/product.model';
import { Rating } from './app/rating/rating.model';
import { Seller } from './app/sellers/sellers.model';

export interface SuccessResponse {
  success: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartResponse {
  cart: CartItem[];
}

export interface AddressResponse {
  address: string;
  city: string;
  country: string;
}

export interface ProductResponse {
  id: string;
  title: string;
  drinkCategory: string;
  packaging: string;
  size: string;
  price: number;
  stock: number;
  seller: Seller;
  picture: string;
  actualPrice: number;
  discount: number;
}

export interface BuyerResponse {
  id: string;
  name: string;
  surname: string;
  legalPerson: boolean;
  title: string;
  registerNumber: number;
  targetedMarkets: string[];
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  orders: string[];
  cart: { productId: Product; quantity: number }[];
}

export interface OrderResponse {
  id: string;
  products: { product: Product; quantity: number }[];
  buyer: Buyer;
  seller: Seller;
  totalPrice: number;
  dateOfPurchase: Date;
  lastDateOfDelivery: Date;
  address: string;
  city: string;
  country: string;
  status: OrderStatus;
  uid: string;
  coordinates: number[];
  score: Rating;
}

export interface SellerResponse {
  id: string;
  name: string;
  surname: string;
  title: string;
  address: string;
  city: string;
  country: string;
  registerNumber: number;
  companyType: string;
  targetedMarkets: string[];
  phone: string;
  website: string;
  email: string;
  orders: string[];
  products: string[];
  coordinates: number[];
}

export interface RatingResponse {
  id: string;
  seller: Seller;
  buyer: Buyer;
  order: Order;
  score: number;
}
