import {
  Controller,
  Put,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../modules/auth/jwt-auth.guard';
import { UsersService } from '../modules/users/users.service';
import { UpdateUserDto } from '../modules/users/dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('update')
  @HttpCode(HttpStatus.OK)
  async update(@Request() req, @Body() UpdateUserDto: UpdateUserDto) {
    const userId = req.user.userId;
    return this.usersService.update(userId, UpdateUserDto);
  }
}
