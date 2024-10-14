import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization 헤더가 없습니다.');
    }

    const token = authHeader.split(' ')[1]; // Bearer 토큰에서 실제 토큰만 추출
    if (!token) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    if (!process.env.JWT_SECRET || typeof process.env.JWT_SECRET !== 'string') {
      throw new HttpException(
        'JWT_SECRET 환경 변수 확인 바람',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded; // 디코딩된 토큰을 반환
    } catch (err) {
      throw new HttpException(
        '유효하지 않은 토큰입니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  },
);
