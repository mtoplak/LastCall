import { ProductCategory } from "enums/product.enum";
import { IDrink } from "models/drink";
import { sampleSeller1, sampleSeller2 } from "./seller.mock";

export const sampleDrink1: IDrink = {
    _id: '1',
    title: 'First Drink',
    price: 7.00,
    picture: 'sample.jpg',
    drinkCategory: ProductCategory.OTHER,
    stock: 100,
    size: '15 oz',
    packaging: 'Can',
    discount: 0,
    actualPrice: 7.00,
    seller: sampleSeller1
};

export const sampleDrink2: IDrink = {
    _id: '2',
    title: 'Second Drink',
    price: 10.00,
    picture: 'sample.jpg',
    drinkCategory: ProductCategory.OTHER,
    stock: 100,
    size: '12 oz',
    packaging: 'Can',
    discount: 0.5,
    actualPrice: 5.00,
    seller: sampleSeller1
};

export const sampleDrink3: IDrink = {
    _id: '3',
    title: 'Third Drink',
    price: 3.00,
    picture: 'sample.jpg',
    drinkCategory: ProductCategory.OTHER,
    stock: 100,
    size: '12 oz',
    packaging: 'Can',
    discount: 0.2,
    actualPrice: 2.40,
    seller: sampleSeller2
};

export const products: IDrink[] = [sampleDrink1, sampleDrink2, sampleDrink3]