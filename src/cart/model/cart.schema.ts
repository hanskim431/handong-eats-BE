import * as mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cartItems: [
    {
      menuId: {
        type: String,
        ref: 'User',
        required: true,
      },
      quantity: {
        type: Number,
        ref: 'Menu',
        required: true,
      },
    },
  ],
});
