import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto.userId, loginAuthDto.password);
  }

  @Post('logout')
  logout(@Body() body: any) {
    return this.authService.logout(body);
  }

  @Post('refresh')
  refresh(@Body() refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }
}
