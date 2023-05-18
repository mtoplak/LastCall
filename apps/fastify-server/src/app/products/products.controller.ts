import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Seller } from "../sellers/sellers.model";
import { Product } from "./product.model";

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) { }

    @Post()
    async addProduct(
        @Body() productData: Partial<Product>,
        @Body('seller') seller: string,
    ): Promise<{ id: string }> {
        const generatedID = await this.productService.insertProduct(
            productData,
            seller,
            );
        return { id: generatedID };
    }

    @Get()
    async getAllProducts(): Promise<Product[]> {
        const products = await this.productService.getAllProducts();
        return products;
    }

    @Get(':id')
    async getSingleProduct(@Param('id') id: string): Promise<Product> {
        const product = await this.productService.getSingleProduct(id);
        return product;
    }

    @Patch(':id')
    async updateProduct(@Param('id') productId: string, @Body() updatedProductData: Partial<Product>): Promise<{ success: boolean }> {
      await this.productService.updateProduct(productId, updatedProductData);
        return { success: true };
    }

    @Delete(':id')
    async removeProduct(@Param('id') id: string): Promise<{ success: boolean }> {
        await this.productService.deleteProduct(id);
        return { success: true };
    }

}