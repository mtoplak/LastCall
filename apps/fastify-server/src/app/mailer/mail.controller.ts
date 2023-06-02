import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { MailService } from './mail.service';


@Controller('contact')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Post('/sendMessage')
    async checkPrice(
        @Body('seller') sellerEmail: string,
        @Body('buyer') buyerEmail: string,
        @Body('message') message: string
    ): Promise<{ success: boolean; }> {
        const success = await this.mailService.sendMessage(
            sellerEmail, buyerEmail, message
        );
        return { success };
    }

}
