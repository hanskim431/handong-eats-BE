import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/users/model/users.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    @InjectModel('User') private readonly userModel: Model<User>,
    // eslint-disable-next-line no-unused-vars
    private readonly usersService: UsersService,
    // eslint-disable-next-line no-unused-vars
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
    const user: Omit<User, 'password'> | null =
      await this.usersService.findUserByRefreshToken(token);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.generateTokensAndUpdateUser(user);
  }

  async validateUser(
    userId: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user: User | null = await this.userModel
      .where({ userId: userId })
      .findOne()
      .exec()
      .catch(() => {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      });

    if (!user) return null;
    const userObj = user.toObject();
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const { password, ...result } = userObj;
      return result;
    }

    return null;
  }

  private async generateTokensAndUpdateUser(user: Omit<User, 'password'>) {
    const payload = { username: user.name, sub: user.userId };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.usersService.update(user.userId, { refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }
}
