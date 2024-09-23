import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interface/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // TODO: RTR 구현
  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.generateTokensAndUpdateUser(user);
  }

  logout(id: number) {
    return `This action returns a #${id} logout`;
  }

  async refresh(token: string) {
    // 1. 리프레시 토큰 검증
    const user = await this.usersService.findUserByRefreshToken(token);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.generateTokensAndUpdateUser(user);
  }

  async validateUser(userID: string, pass: string): Promise<any> {
    const user = await this.usersService
      .findOneByUserID(userID)
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::user.validate-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  private async generateTokensAndUpdateUser(user: User) {
    const payload = { username: user.name, sub: user.userID };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.usersService.update(user.userID, { refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }
}
