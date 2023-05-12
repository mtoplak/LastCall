import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";
import { BuyersService } from "./buyers.service";

@Controller('buyers')
export class BuyersController {
    constructor(private buyersService: BuyersService) { }

    @Post()
    async addBuyer(
        @Body('name') name: string,
        @Body('surname') surname: string,
        @Body('legalPerson') legalPerson: boolean,
        @Body('title') title: string,
        @Body('registerNumber') registerNumber: number,
        @Body('targetedMarket') targetedMarket: string,
        @Body('address') address: string,
        @Body('city') city: string,
        @Body('country') country: string,
        @Body('phone') phone: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        const generatedID = await this.buyersService.addBuyer(
            name,
            surname,
            legalPerson,
            title,
            registerNumber,
            targetedMarket,
            address, //array
            city,
            country,
            phone,
            email,
            password,
            );
        return { id: generatedID };
    }

    @Get()
    async getAllBuyers() {
        const buyers = await this.buyersService.getAllBuyers();
        return buyers;
    }

    @Get(':id')
    getSingleBuyer(@Param('id') id: string) {
        const buyer = this.buyersService.getSingleBuyer(id);
        return buyer;
    }

    @Patch(':id')
    async updateBuyer(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('surname') surname: string,
        @Body('legalPerson') legalPerson: boolean,
        @Body('title') title: string,
        @Body('registerNumber') registerNumber: number,
        @Body('targetedMarket') targetedMarket: string,
        @Body('address') address: string,
        @Body('city') city: string,
        @Body('country') country: string,
        @Body('phone') phone: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        await this.buyersService.updateBuyer(
            id,
            name,
            surname,
            legalPerson,
            title,
            registerNumber,
            targetedMarket,
            address,
            city,
            country,
            phone,
            email,
            password
            );
        return null;
    }

    @Delete(':id')
    async removeBuyer(@Param('id') id: string) {
        await this.buyersService.removeBuyer(id);
        return null;
    }

}