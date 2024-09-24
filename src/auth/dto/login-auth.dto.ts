import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class LoginAuthDto extends PickType(CreateUserDto, [
  'userId',
  'password',
] as const) {}
