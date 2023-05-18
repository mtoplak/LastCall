import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";
import { SellersService } from "./sellers.service";
import { Seller } from "./sellers.model";

@Controller('sellers')
export class SellersController {
    constructor(private sellersService: SellersService) { }

    @Post()
    async addSeller(
        @Body() sellerData: Partial<Seller>,
    ): Promise<{ id: string }>  {
        const generatedID = await this.sellersService.addSeller(
            sellerData,
            );
        return { id: generatedID };
    }

    @Get()
    async getAllSellers(): Promise<Seller[]> {
        const sellers = await this.sellersService.getAllSellers();
        return sellers;
    }

    @Get(':id')
    async getSingleSeller(@Param('id') id: string): Promise<Seller> {
        const seller = await this.sellersService.getSingleSeller(id);
        return seller;
    }

    @Patch(':id')
    async updateSeller(@Param('id') sellerId: string, @Body() updatedSellerData: Partial<Seller>): Promise<{ success: boolean }> {
      await this.sellersService.updateSeller(sellerId, updatedSellerData);
      return { success: true };
    }

    @Delete(':id')
    async removeSeller(@Param('id') id: string): Promise<{ success: boolean }> {
        await this.sellersService.removeSeller(id);
        return { success: true };
    }

}