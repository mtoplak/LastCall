import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) { }

    @Post()
    async addProduct(
        @Body('naziv') prodNaziv: string,
        @Body('opis') prodOpis: string,
        @Body('cena') prodCena: number
    ) {
        const generatedID = await this.productService.insertProduct(
            prodNaziv,
            prodOpis,
            prodCena
            );
        return { id: generatedID };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productService.getAllProducts();
        return products;
    }

    @Get(':ime')
    getSingleProduct(@Param('ime') ime: string) {
        const product = this.productService.getSingleProduct(ime);
        return product;
    }

    @Patch(':ime')
    async updateProduct(
        @Param('ime') ime: string,
        @Body('naziv') naziv: string,
        @Body('opis') opis: string,
        @Body('cena') cena: number
    ) {
        await this.productService.updateProduct(ime, naziv, opis, cena);
        return null;
    }

    @Delete(':ime')
    async removeProduct(@Param('ime') ime: string) {
        await this.productService.deleteProduct(ime);
        return null;
    }

}