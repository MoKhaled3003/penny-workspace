import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Register a new user
  async register(email: string, password: string) {
    return this.usersService.createUser(email, password);
  }

  // Sign-in (validate user and create JWT token)
  async login(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) throw new Error('User not found');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const payload = { email: user.email };
    const accessToken = this.jwtService.sign(payload, {
      secret: 'secretKey', // Use a secure key in production
      expiresIn: '8h', // Token expires after 8 hours
    });
    return { accessToken };
  }

  // Validate the JWT token
  async validateUser(payload: any) {
    return { email: payload.email };
  }
}
