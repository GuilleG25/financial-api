import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './auth.dto';
import { UserDto } from '../users/createUser.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        throw new HttpException(
          {
            message: 'Credenciales inválidas',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const payload = {
        username: user._doc.username,
        email: user._doc.email,
        sub: user._doc._id,
      };
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(userDto: UserDto) {
    const hashedPassword = bcrypt.hashSync(userDto.password, 10);
    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });
    return user;
  }

  async getUser(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    user.password = undefined;
    return user;
  }

  async logout() {
    return {
      message: 'Cierre de sesión exitoso',
    };
  }
}
