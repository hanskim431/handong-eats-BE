import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  readonly userID: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
