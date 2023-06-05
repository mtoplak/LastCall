import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('email')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  async findEmail(@Body('email') email: string): Promise<string> {
    return this.authenticationService.findRole(email);
  }
}
