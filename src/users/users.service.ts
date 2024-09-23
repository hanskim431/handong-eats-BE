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
    const user = await this.findOneByUserID(createUserDto.userID).catch(() => {
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

  async update(userID: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findOneAndUpdate(
        { userID: userID }, // 조건: userID 기준
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

  remove(userID: string) {
    return `This action removes a #${userID} user`;
  }

  async findOneByUserID(userID: string): Promise<User | null> {
    const user = await this.userModel
      .where({ userID: userID })
      .findOne()
      .exec()
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::user.findOneByUserID-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return user;
  }

  async findUserByRefreshToken(refreshToken: string): Promise<User | null> {
    // 여기서는 리프레시 토큰을 포함하는 사용자 찾기
    const user = await this.userModel
      .findOne({ refreshToken })
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::user.findUserByRefreshToken-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return user;
  }
}
