import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interface/users.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOneByUserID(userID: string): Promise<User | null> {
    try {
      const user = await this.userModel
        .where({ userID: userID })
        .findOne()
        .exec();

      return user;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error :: user.findOne',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.findOneByUserID(createUserDto.userID).catch(
      (error) => {
        console.error(error);

        throw new HttpException(
          'INTERNAL_SERVER_ERROR :: register user',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      },
    );

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(userID: string) {
    return `This action removes a #${userID} user`;
  }
}
