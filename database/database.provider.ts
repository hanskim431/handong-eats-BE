import * as mongoose from 'mongoose';
import 'dotenv/config';

const mongodbID = process.env.MONGODB_ID;
const mongodbPassword = process.env.MONGODB_PW;
const collectionName = 'handong_eats';
const mongodbUrl = `mongodb+srv://${mongodbID}:${mongodbPassword}@handong-eats.tkatv.mongodb.net/${collectionName}?retryWrites=true&w=majority&appName=handong-eats`;

if (!mongodbID || typeof mongodbID !== 'string') {
  throw new Error('MONGODB_ID 환경 변수를 확인해주세요.');
}

if (!mongodbPassword || typeof mongodbPassword !== 'string') {
  throw new Error('MONGODB_PW 환경 변수를 확인해주세요.');
}

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(mongodbUrl),
  },
];
