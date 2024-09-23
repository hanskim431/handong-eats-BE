import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  refreshToken: { type: String, required: false },
});
