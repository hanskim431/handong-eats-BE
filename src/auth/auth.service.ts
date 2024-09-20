import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User } from './interface/users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,

    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.findOne(createUserDto.userID);

    if (user) {
      throw new HttpException('User ID already exists', HttpStatus.CONFLICT);
    }

    const bycrptHash = process.env.BYCRPT_HASH;

    if (!bycrptHash || typeof bycrptHash !== 'string') {
      throw new Error('MONGODB_PW 환경 변수를 확인해주세요.');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      bycrptHash,
    );

    createUserDto.password = String(hashedPassword);

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async validateUser(userID: string, password: string): Promise<any> {
    // 유효성 검사
    const user = await this.userService.findOne(userID);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    //TODO: bcrypt 구현
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
  async login(userID: string, password: string) {
    /* TODO: 아이디 비밀번호 유효성검사
      [예외] 부정 접근이면 예외
      유효성검사 : 아이디에 특수 문자
    */

    const user = await this.validateUser(userID, password);

    // TODO: Token 구현
    const payload = { userID: user.userID, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }
  refreshToken(refreshToken: any) {
    throw new Error('Method not implemented.');
  }
  logout() {
    throw new Error('Method not implemented.');
  }
}
