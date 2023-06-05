import { Schema, Document, Model, model } from 'mongoose';
import { Seller } from '../sellers/sellers.model';
import { ProductCategory } from './product-category.enum';

export const ProductSchema = new Schema({
  title: { type: String, required: true },
  drinkCategory: { type: String, enum: Object.values(ProductCategory) },
  packaging: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number }, //sale price oz. to kaj se prikaze
  stock: { type: Number, required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'Seller' },
  actualPrice: { type: Number }, //polna cena
  discount: { type: Number, default: 0 },
  picture: { type: String },
});

export interface Product extends Document {
  title: string;
  drinkCategory: ProductCategory;
  packaging: string;
  size: string;
  price: number;
  stock: number;
  seller: Seller;
  actualPrice: number;
  discount: number;
  picture: string;
}

export const ProductModel: Model<Product> = model<Product>(
  'Product',
  ProductSchema,
);
export type ProductDocument = Product & Document;
