import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('email')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  async findEmail(
    @Body('email') email: string
    ): Promise<string> {
    const result = await this.authenticationService.findRole(email);
    return result;
  }
/*
  @Post('/coordinates')
  async getCoordinates(
    @Body('address') address: string,
    @Body('city') city: string,
    @Body('country') country: string,
  ): Promise<number[]> {
    try {
      return this.authenticationService.getCoordinates(address, city, country);
    } catch (error) {
      throw new Error('Failed to retrieve coordinates in controller: ' + error.message);
    }
  }
*/
}
