import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interface/user.interface';

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

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
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
