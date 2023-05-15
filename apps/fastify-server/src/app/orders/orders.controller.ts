import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { Buyer } from "../buyers/buyers.model";
import { Product } from "../products/product.model";
import { Seller } from "../sellers/sellers.model";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    async addOrder(
      @Body('products') products: { productId: string, quantity: number }[],
      @Body('buyer') buyer: string,
      @Body('seller') seller: string,
      @Body('totalPrice') totalPrice: number,
      @Body('lastDateOfDelivery') lastDateOfDelivery: Date,
      @Body('address') address: string,
      @Body('city') city: string,
      @Body('country') country: string,
    ) {
      const productIds = products.map((product) => product.productId);
      const quantities = products.map((product) => product.quantity);
    
      const generatedID = await this.ordersService.addOrder(
        productIds,
        buyer,
        seller,
        totalPrice,
        lastDateOfDelivery,
        address,
        city,
        country,
        quantities
      );
    
      return { id: generatedID };
    }
    
    

    @Get()
    async getAllOrders() {
        const orders = await this.ordersService.getAllOrders();
        return orders;
    }

    @Get(':id')
    async getSingleOrder(@Param('id') id: string) {
        const order = await this.ordersService.getSingleOrder(id);
        return order;
    }

    @Patch(':id')
    async updateOrder(
        @Param('id') id: string,
        //@Body('products') products: string[],
        @Body('buyer') buyer: Buyer,
        @Body('seller') seller: Seller,
        @Body('totalPrice') totalPrice: number,
        @Body('lastDateOfDelivery') lastDateOfDelivery: Date,
        @Body('address') address: string,
        @Body('city') city: string,
        @Body('country') country: string,
    ) {
        await this.ordersService.updateOrder(
            id,
            //products,
            buyer,
            seller,
            totalPrice,
            lastDateOfDelivery,
            address,
            city,
            country,
            );
        return null;
    }

    @Delete(':id')
    async removeOrder(@Param('id') id: string) {
        await this.ordersService.removeOrder(id);
        return null;
    }

}