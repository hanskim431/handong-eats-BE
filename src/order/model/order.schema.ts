/* eslint-disable no-unused-vars */
import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: false },
    orderStatus: { type: String, required: true },
    userId: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    storeName: { type: String, required: true },
    cartItems: [
      {
        menuId: { type: String, required: true },
        amount: { type: Number, required: true },
        price: { type: Number, required: true },
        sumPrice: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);
