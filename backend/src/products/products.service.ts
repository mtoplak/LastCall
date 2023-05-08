import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const newProductId = new Date().toString();
        const newProduct = new Product(newProductId, title, desc, price);
        this.products.push(newProduct);
        return newProductId;
    }

    getAllProducts() {
        return [...this.products];
    }

    getProduct(productIme: string) {
        const product = this.findProduct(productIme)[0];
        if (!product) {
            throw new NotFoundException('Ne najdem produkta.');
        }
        return { ...product };
    }

    updateProduct(productIme: string, naziv: string, opis: string, cena: number) {
        const [product, index] = this.findProduct(productIme);
        const updatedProduct = { ...product };
        if (naziv) {
            updatedProduct.naziv = naziv;
        }
        if (opis) {
            updatedProduct.opis = opis;
        }
        if (cena) {
            updatedProduct.cena = cena;
        }
        this.products[index] = updatedProduct;
    }

    private findProduct(productIme: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.naziv === productIme);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Ne najdem produkta.');
        }
        return [product, productIndex];
    }

    deleteProduct(productIme: string) {
        const index = this.findProduct(productIme)[1];
        this.products.splice(index, 1);
    }
}