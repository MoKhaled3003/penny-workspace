import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlacklistedToken } from './blacklisted-token.entity';

@Injectable()
export class TokenBlacklistService {
  constructor(
    @InjectRepository(BlacklistedToken)
    private blacklistedTokenRepository: Repository<BlacklistedToken>,
  ) {}

  async addToBlacklist(token: string, expiresIn: number): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);

    const blacklistedToken = this.blacklistedTokenRepository.create({
      token,
      expiresAt,
    });

    await this.blacklistedTokenRepository.save(blacklistedToken);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const blacklisted = await this.blacklistedTokenRepository.findOne({
      where: { token },
    });

    // Check if token exists and if it's still valid
    if (blacklisted && new Date() < blacklisted.expiresAt) {
      return true;
    }

    return false;
  }
}
