import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { JwtAuthGuard } from '../modules/auth/jwt-auth.guard';
import { LoginDto } from '../modules/auth/dto/auth.dto';
import { UserDto } from '../modules/users/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() userDto: UserDto) {
    return this.authService.register(userDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    return this.authService.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    const email = req.user.email;
    return this.authService.getUser(email);
  }
}
