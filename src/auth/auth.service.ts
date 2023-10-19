import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    let user: User;
    try {
      user = await this.userService.findOneAuthOrFail({
        email,
      });
    } catch (error) {
      return null;
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) return null;
    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };
    return { token: this.jwtService.sign(payload) };
  }
}
