import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('email')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  async findEmail(@Body('email') email: string): Promise<string> {
    const result = await this.authenticationService.findRole(email);
    return result;
  }
}
