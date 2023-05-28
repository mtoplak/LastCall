import { Injectable } from '@nestjs/common';
import { AuthenticationRepository } from './authentication.repository';
import got from 'got';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  async findRole(email: string): Promise<string> {
    const result = await this.authenticationRepository.findEmail(email);
    return result.role;
  }
/*
  async getCoordinates(
    address: string,
    city: string,
    country: string,
  ): Promise<number[]> {
    const formattedAddress = `${address} ${city} ${country}`;
    const encodedAddress = encodeURIComponent(formattedAddress);
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&addressdetails=1&limit=1&polygon_svg=1`;

    try {
      console.log("1");
      const response = await got(apiUrl);
      console.log("2");
      const data = JSON.parse(response.body);
      console.log("3");
      if (data.length === 0) {
        throw new Error('Address not found');
      }

      const { lat, lon } = data[0];
      return [parseFloat(lat), parseFloat(lon)];
    } catch (error) {
      throw new Error('Failed to retrieve coordinates');
    }
  }
  */
}
