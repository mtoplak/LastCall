import { Injectable } from '@nestjs/common';
import { AuthenticationRepository } from './authentication.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  async findRole(email: string): Promise<string> {
    const result = await this.authenticationRepository.findEmail(email);
    return result.role;
  }
}
