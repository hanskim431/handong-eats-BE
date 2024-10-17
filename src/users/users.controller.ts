import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from 'src/utils/get-user.decorator';

@Controller('users')
export class UsersController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateUserDto) {
    return this.usersService.register(createAuthDto);
  }

  // TODO: Auth Guard
  @Get()
  findOne(@GetUser() userToken: any) {
    const userId = userToken.userId;
    return this.usersService.findOneByUserID(userId);
  }

  // TODO: Auth Guard
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // TODO: Auth Guard
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
