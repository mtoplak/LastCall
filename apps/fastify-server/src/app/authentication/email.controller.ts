import { Body, Controller, Post, Param } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post(':email')
  async findEmail(@Param('email') email: string): Promise<string> {
    const result = await this.emailService.findRole(email);
    return result;
  }
}
