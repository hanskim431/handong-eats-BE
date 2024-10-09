import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() loginAuthDto: LoginAuthDto) {
    const { userId, password } = loginAuthDto;
    return this.authService.login(userId, password);
  }

  @Post('logout')
  logout(@Body() body: any) {
    return this.authService.logout(body);
  }

  // TODO: get the refresh token in header
  @Post('refresh')
  refresh(@Body() body: any) {
    return this.authService.refresh(body.refreshToken);
  }
}
