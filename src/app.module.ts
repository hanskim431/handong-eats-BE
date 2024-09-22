import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { AuthModule } from './auth/auth.module';

const mongodb_id = process.env.MONGODB_ID;
const mongodb_pw = process.env.MONGODB_PW;
const mongodb_collection = process.env.MONGODB_COLLECTION;

if (!mongodb_id || typeof mongodb_id != 'string') {
  throw new HttpException(
    'MongoDB 환경 변수 확인 바람',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}

if (!mongodb_pw || typeof mongodb_pw != 'string') {
  throw new HttpException(
    'MongoDB 환경 변수 확인 바람',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}

if (!mongodb_collection || typeof mongodb_collection != 'string') {
  throw new HttpException(
    'MongoDB 환경 변수 확인 바람',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${mongodb_id}:${mongodb_pw}@handong-eats.tkatv.mongodb.net/
      ${mongodb_collection}?retryWrites=true&w=majority&appName=handong-eats-eats`,
    ), // MongoDB 연결 설정
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
