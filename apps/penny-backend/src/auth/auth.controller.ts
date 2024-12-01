import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TokenBlacklistService } from './token-blacklist.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  // Signup - Register a new user
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() authCredentialsDto: AuthCredentialsDto) {
    try {
      const result = await this.authService.register(
        authCredentialsDto.email,
        authCredentialsDto.password,
      );
      return {
        message: 'User registered successfully',
        data: result,
      };
    } catch (error) {
      // Handle potential errors like duplicate email
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Error occurred during user registration',
      };
    }
  }

  // Signin - Login and issue JWT token
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() authCredentialsDto: AuthCredentialsDto) {
    try {
      const result = await this.authService.login(
        authCredentialsDto.email,
        authCredentialsDto.password,
      );
      return {
        message: 'Login successful',
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid email or password. Please check your credentials.',
      };
    }
  }

  // Signout - This would typically blacklist the token
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async signout(@Req() req) {
    try {
      const token = this.extractToken(req);
      const expiresIn = 8 * 60 * 60; // Token expiry in seconds (8 hours)
      await this.tokenBlacklistService.addToBlacklist(token, expiresIn);
      return {
        message: 'Logged out successfully',
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Unable to sign out. Please try again.',
      };
    }
  }

  // Helper Method to Extract Token
  private extractToken(req): string {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new Error('Authorization header format is invalid');
    }

    return parts[1];
  }
}
