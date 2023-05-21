import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { CreateUpdateProductDto } from './createUpdateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async addProduct(
    @Body() createProductDto: CreateUpdateProductDto,
    @Body('seller') seller: string,
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto, seller);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getSingleProduct(@Param('id') id: string): Promise<Product> {
      return await this.productService.getSingleProduct(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body() updateProductDto: CreateUpdateProductDto,
  ): Promise<Product> {
    const result = await this.productService.updateProduct(productId, updateProductDto);
    return result;
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string): Promise<{ success: boolean }> {
    await this.productService.removeProduct(id);
    return { success: true };
  }

}
