import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Seller } from "../sellers/sellers.model";

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) { }

    @Post()
    async addProduct(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('packaging') packaging: string,
        @Body('size') size: string,
        @Body('price') price: number,
        @Body('stock') stock: number,
        @Body('orders') orders: string[],
        @Body('seller') seller: string
    ) {
        const generatedID = await this.productService.insertProduct(
            title,
            description,
            packaging,
            size,
            price,
            stock,
            orders,
            seller
            );
        return { id: generatedID };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productService.getAllProducts();
        return products;
    }

    @Get(':id')
    getSingleProduct(@Param('id') id: string) {
        const product = this.productService.getSingleProduct(id);
        return product;
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('packaging') packaging: string,
        @Body('size') size: string,
        @Body('price') price: number,
        @Body('stock') stock: number,
        @Body('orders') orders: string[],
        @Body('seller') seller: Seller
    ) {
        await this.productService.updateProduct(
            id,
            title,
            description,
            packaging,
            size,
            price,
            stock,
            orders,
            seller
            );
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') id: string) {
        await this.productService.deleteProduct(id);
        return null;
    }

}