import { Injectable } from '@nestjs/common';
import { EmailRepository } from './email.repository';

@Injectable()
export class EmailService {
  constructor(private readonly emailRepository: EmailRepository) {}

  async findRole(email: string): Promise<string> {
    const result = await this.emailRepository.findEmail(email);
    return result.role;
  }
}
