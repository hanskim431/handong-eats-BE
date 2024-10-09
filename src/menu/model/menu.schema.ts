import * as mongoose from 'mongoose';

export const MenuSchema = new mongoose.Schema({
  menuID: { type: String, required: true },
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  store: { type: String, required: true },
  description: { type: String, required: false },
  isActive: { type: Boolean, required: true, default: true },
});
