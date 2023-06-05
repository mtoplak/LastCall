import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { CreateUpdateProductDto } from './create-update-product.dto';
import { SuccessResponse } from 'src/data.response';
import { Cart } from '../buyers/buyers.model';
import { FirebaseTokenGuard } from '../guards/firebase-token-guard';

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
    return this.productService.getAllProducts();
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
    return await this.productService.updateProduct(productId, updateProductDto);
  }

  @Delete(':id')
  async removeProduct(@Param('id') productId: string): Promise<SuccessResponse> {
    return this.productService.removeProduct(productId);
  }
  

  @Post('/removefromstock')
  async removeFromStock(
    @Body() productData: Cart[],
  ): Promise<Product[] | false> {
    return this.productService.removeFromStock(productData);
  }

  @Post('/meets-requirements/:email')
  async meetsRequirements(
    @Param('email') sellerEmail: string,
    @Body() productData: Cart[],
  ): Promise<boolean> {
    return await this.productService.minPriceRequirements(
      sellerEmail,
      productData,
    );
  }

  @Post('/sale')
  async makeSale(
    @Body('productIds') productIds: string[],
    @Body('discount') discount: number,
  ) {
    try {
      return await this.productService.makeSale(productIds, discount);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
