import * as mongoose from 'mongoose';
import 'dotenv/config';

const mongodbUrl = process.env.MONGODB_URI;

if (!mongodbUrl || typeof mongodbUrl !== 'string') {
  throw new Error('MONGODB_URI 환경 변수를 확인해주세요.');
}

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(mongodbUrl),
  },
];
