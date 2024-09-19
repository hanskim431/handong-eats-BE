import { Document } from 'mongoose';

export interface User extends Document {
  readonly userID: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly age: number;
  readonly phone: string;
}
