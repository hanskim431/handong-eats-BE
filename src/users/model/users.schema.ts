import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'consumer' },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  point: { type: Number, required: true, default: 0 },
  refreshToken: { type: String, required: false },
});
