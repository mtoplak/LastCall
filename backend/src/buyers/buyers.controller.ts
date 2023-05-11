import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";
import { BuyersService } from "./buyers.service";

@Controller('buyers')
export class BuyersController {
    constructor(private buyersService: BuyersService) { }

    @Post()
    async addBuyer(
        @Body('ime') ime: string,
        @Body('priimek') priimek: string,
        @Body('pravnaOseba') pravnaOseba: boolean,
        @Body('nazivPodjetja') nazivPodjetja: string,
        @Body('davcnaStevilka') davcnaStevilka: number,
        @Body('naslov') naslov: string,
        @Body('mesto') mesto: string,
        @Body('drzava') drzava: string,
        @Body('ciljniTrg') ciljniTrg: string,
        @Body('email') email: string,
        @Body('telefon') telefon: string,

    ) {
        const generatedID = await this.buyersService.addBuyer(
            ime,
            priimek,
            pravnaOseba,
            nazivPodjetja,
            davcnaStevilka,
            naslov,
            mesto,
            drzava,
            ciljniTrg,
            email,
            telefon,
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
        @Body('ime') ime: string,
        @Body('priimek') priimek: string,
        @Body('pravnaOseba') pravnaOseba: boolean,
        @Body('nazivPodjetja') nazivPodjetja: string,
        @Body('davcnaStevilka') davcnaStevilka: number,
        @Body('naslov') naslov: string,
        @Body('mesto') mesto: string,
        @Body('drzava') drzava: string,
        @Body('ciljniTrg') ciljniTrg: string,
        @Body('email') email: string,
        @Body('telefon') telefon: string
    ) {
        await this.buyersService.updateBuyer(id,
            ime,
            priimek,
            pravnaOseba,
            nazivPodjetja,
            davcnaStevilka,
            naslov,
            mesto,
            drzava,
            ciljniTrg,
            email,
            telefon,);
        return null;
    }

    @Delete(':id')
    async removeBuyer(@Param('id') id: string) {
        await this.buyersService.removeBuyer(id);
        return null;
    }

}