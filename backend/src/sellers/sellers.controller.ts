import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";
import { SellersService } from "./sellers.service";

@Controller('sellers')
export class SellersController {
    constructor(private sellersService: SellersService) { }

    @Post()
    async addSeller(
        @Body('name') name: string,
        @Body('surname') surname: string,
        @Body('title') title: string,
        @Body('address') address: string,
        @Body('city') city: string,
        @Body('country') country: string,
        @Body('registerNumber') registerNumber: number,
        @Body('tip') tip: string,
        @Body('targetedMarket') targetedMarket: string,
        @Body('phone') phone: string,
        @Body('website') website: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        const generatedID = await this.sellersService.addSeller(
            name,
            surname,
            title,
            address,
            city,
            country,
            registerNumber,
            tip,
            targetedMarket,
            phone,
            website,
            email,
            password,
            );
        return { id: generatedID };
    }

    @Get()
    async getAllSellers() {
        const sellers = await this.sellersService.getAllSellers();
        return sellers;
    }

    @Get(':id')
    getSingleSeller(@Param('id') id: string) {
        const seller = this.sellersService.getSingleSeller(id);
        return seller;
    }

    @Patch(':id')
    async updateSeller(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('surname') surname: string,
        @Body('title') title: string,
        @Body('address') address: string,
        @Body('city') city: string,
        @Body('country') country: string,
        @Body('registerNumber') registerNumber: number,
        @Body('tip') tip: string,
        @Body('targetedMarket') targetedMarket: string,
        @Body('phone') phone: string,
        @Body('website') website: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        await this.sellersService.updateSeller(
            id,
            name,
            surname,
            title,
            address,
            city,
            country,
            registerNumber,
            tip,
            targetedMarket,
            phone,
            website,
            email,
            password,
            );
        return null;
    }

    @Delete(':id')
    async removeSeller(@Param('id') id: string) {
        await this.sellersService.removeSeller(id);
        return null;
    }

}