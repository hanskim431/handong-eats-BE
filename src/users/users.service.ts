import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // TODO: AUTH 로 옮기기
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(userID: string) {
    return `This action removes a #${userID} user`;
  }

  async findOne(userID: string): Promise<User> {
    try {
      const user = await this.userModel
        .where({ userID: userID })
        .findOne()
        .exec();

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error :: user.findOne',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
