import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) { }

    @Post()
    addProduct(@Body('naziv') naziv: string, @Body('opis') opis: string, @Body('naziv') cena: number) {
        const generatedID = this.productService.insertProduct(naziv, opis, cena);
        return { id: generatedID };
    }

    @Get()
    getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get(':ime')
    getProduct(@Param('ime') ime: string) {
        const product = this.productService.getProduct(ime);
        return { ...product };
    }

    @Patch(':ime')
    updateProduct(@Param('ime') ime: string, @Body('naziv') naziv: string, @Body('opis') opis: string, @Body('cena') cena: number) {
        this.productService.updateProduct(ime, naziv, opis, cena);
        return null;
    }

    @Delete(':ime')
    removeProduct(@Param('ime') ime: string) {
        this.productService.deleteProduct(ime);
        return null;
    }

}