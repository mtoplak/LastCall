import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";

@Controller('buyers')
export class BuyerController {
    constructor(private buyerService: BuyerController) { }

    @Post()
    async addBuyer(
        @Body('ime') ime: string,
        @Body('priimek') priimek: string,
        @Body('naslov') naslov: string
    ) {
        const generatedID = await this.buyerService.addBuyer(
            ime,
            priimek,
            naslov
            );
        return { id: generatedID };
    }

    @Get()
    async getAllBuyers() {
        const buyers = await this.buyerService.getAllBuyers();
        return buyers;
    }

    @Get(':id')
    getSingleBuyer(@Param('id') id: string) {
        const buyer = this.buyerService.getSingleBuyer(id);
        return buyer;
    }

    @Patch(':id')
    async updateBuyer(
        @Param('id') id: string,
        @Body('ime') ime: string,
        @Body('priimek') priimek: string,
        @Body('naslov') naslov: string
    ) {
        await this.buyerService.updateBuyer(id, ime, priimek, naslov);
        return null;
    }

    @Delete(':id')
    async removeBuyer(@Param('id') id: string) {
        await this.buyerService.removeBuyer(id);
        return null;
    }

}