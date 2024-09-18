import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(mongoUri), //
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
