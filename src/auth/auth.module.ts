import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from 'src/users/model/users.schema';

if (!process.env.JWT_SECRET || typeof process.env.JWT_SECRET !== 'string') {
  throw new HttpException(
    'JWT_SECRET 환경 변수 확인 바람',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}
@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // JWT 서명에 사용할 비밀키
      signOptions: { expiresIn: '60s' }, // 토큰 만료 시간 설정
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
