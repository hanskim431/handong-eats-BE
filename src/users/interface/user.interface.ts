import { Document } from 'mongoose';

export interface User extends Document {
  userID: string;
  name: string;
  email: string;
  password: string;
  role: string;
  age: number;
  phone: string;
}
