import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.findOneByUserID(createUserDto.userId).catch(() => {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR :: user.register',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    createUserDto.password = hashedPassword;

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findOneAndUpdate(
        { userId: userId }, // 조건: userId 기준
        updateUserDto,
        {
          new: true, // 업데이트된 문서를 반환
          useFindAndModify: false, // Mongoose의 findAndModify 대신 findOneAndUpdate 사용
        },
      )
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::user.update-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return updatedUser;
  }

  remove(userId: string) {
    return `This action removes a #${userId} user`;
  }

  async findOneByUserID(
    userId: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user: User | null = await this.userModel
      .where({ userId: userId })
      .findOne()
      .exec()
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::user.findOneByUserID-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (!user) return null;
    const userObj = user.toObject();
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, refreshToken, ...result } = userObj;
    return result;
  }

  async findUserByRefreshToken(
    refreshToken: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user: User | null = await this.userModel
      .findOne({ refreshToken: refreshToken })
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::user.findUserByRefreshToken-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (!user) return null;
    const userObj = user.toObject();
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...result } = userObj;
    return result;
  }
}
