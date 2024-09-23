import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MenuModule } from './menu/menu.module';
import { CartModule } from './cart/cart.module';

if (!process.env.MONGODB_ID || typeof process.env.MONGODB_ID != 'string') {
  throw new HttpException(
    'MongoDB 환경 변수 확인 바람',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}

if (!process.env.MONGODB_PW || typeof process.env.MONGODB_PW != 'string') {
  throw new HttpException(
    'MongoDB 환경 변수 확인 바람',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}

if (
  !process.env.MONGODB_COLLECTION ||
  typeof process.env.MONGODB_COLLECTION != 'string'
) {
  throw new HttpException(
    'MongoDB 환경 변수 확인 바람',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}

const mongoDBUrl = `mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PW}@handong-eats.tkatv.mongodb.net/${process.env.MONGODB_COLLECTION}?retryWrites=true&w=majority&appName=handong-eats-eats`;

@Module({
  imports: [
    MongooseModule.forRoot(mongoDBUrl), // MongoDB 연결 설정
    UsersModule,
    AuthModule,
    MenuModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
