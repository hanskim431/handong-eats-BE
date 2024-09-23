import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto.userID, loginAuthDto.password);
  }

  // TODO: 로그아웃 구현
  @Post('logout')
  logout(@Body() body: any) {
    return this.authService.logout(body);
  }

  // TODO: 리프래시 구현
  @Post('refresh')
  refresh(@Body() body: any) {
    return this.authService.refresh(body);
  }
}
