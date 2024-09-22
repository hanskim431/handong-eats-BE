import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userID: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserID(userID).catch(() => {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR::user.validate',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null; // TODO: throw exception
  }

  // TODO: RTR 구현
  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { username: user.username, sub: user.userID };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  logout(id: number) {
    return `This action returns a #${id} auth`;
  }

  refresh(id: number) {
    return `This action removes a #${id} auth`;
  }
}
