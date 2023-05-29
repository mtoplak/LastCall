import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { CreateUpdateProductDto } from './createUpdateProduct.dto';
import { SuccessResponse } from 'src/data.response';
import { Cart } from '../buyers/buyers.model';
import { CreateUpdateOrderDto } from '../orders/createUpdateOrder.dto';
import { FirebaseTokenGuard } from '../guards/FirebaseTokenGuard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @UseGuards(FirebaseTokenGuard)
  async addProduct(
    @Body() createProductDto: CreateUpdateProductDto,
    @Body('seller') email: string,
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto, email);
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
  @UseGuards(FirebaseTokenGuard)
  async updateProduct(
    @Param('id') productId: string,
    @Body() updateProductDto: CreateUpdateProductDto,
  ): Promise<Product> {
    const result = await this.productService.updateProduct(
      productId,
      updateProductDto,
    );
    return result;
  }

  @Delete(':id')
  @UseGuards(FirebaseTokenGuard)
  async removeProduct(@Param('id') id: string): Promise<SuccessResponse> {
    await this.productService.removeProduct(id);
    return { success: true };
  }

  @Post('/removefromstock')
  async removeFromStock(@Body() productData: Cart[]): Promise<Product[] | false> {
    return this.productService.removeFromStock(productData);
  }

  @Post('/meets-requirements/:email')
  async meetsRequirements(
    @Param('email') sellerEmail: string,
    @Body() productData: Cart[],
  ): Promise<boolean> {
    const meetsRequirements = await this.productService.minPriceRequirements(
      sellerEmail,
      productData,
    );
    return meetsRequirements;
  }
}
