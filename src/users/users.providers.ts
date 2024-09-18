import { Connection } from 'mongoose';
import { UsersSchema } from './schema/user.schema';

export const usersProviders = [
  {
    provide: 'USER_MODULE',
    useFactory: (connection: Connection) =>
      connection.model('User', UsersSchema),
    Inject: ['DATABASE_CONNECTION'],
  },
];
