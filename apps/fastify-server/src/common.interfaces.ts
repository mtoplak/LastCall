import { Product } from './app/products/product.model';

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
