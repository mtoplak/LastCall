import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";
import { BuyersService } from "./buyers.service";
import { Buyer } from "./buyers.model";

@Controller('buyers')
export class BuyersController {
    constructor(private buyersService: BuyersService) { }

    @Post()
    async addBuyer(
      @Body() buyerData: Partial<Buyer>,
      @Body('basket') basket: { productId: string, quantity: number }[]
    ): Promise<{ id: string }> {
      const productData = basket || [];
    
      const generatedID = await this.buyersService.addBuyer(
        buyerData,
        productData
      );
    
      return { id: generatedID };
    }
    

    @Get()
    async getAllBuyers(): Promise<Buyer[]> {
        const buyers = await this.buyersService.getAllBuyers();
        return buyers;
    }

    @Get(':id')
    async getSingleBuyer(@Param('id') id: string): Promise<Buyer> {
        const buyer = await this.buyersService.getSingleBuyer(id);
        return buyer;
    }

    @Patch(':id')
    async updateBuyer(@Param('id') buyerId: string, @Body() updatedBuyerData: Partial<Buyer>): Promise<{ success: boolean }> {
      await this.buyersService.updateBuyer(buyerId, updatedBuyerData);
      return { success: true };
    }
    

    @Delete(':id')
    async removeBuyer(@Param('id') id: string): Promise<{ success: boolean }> {
        await this.buyersService.removeBuyer(id);
        return { success: true };
    }

}