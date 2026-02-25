import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: any) {
    const user = await this.usersService.findOne(loginDto.username);

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      console.log('Невірне ім’я користувача або пароль', loginDto.username, loginDto.password, await bcrypt.compare(loginDto.password, user.password), user.password)
      throw new UnauthorizedException('Невірне ім’я користувача або пароль');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}