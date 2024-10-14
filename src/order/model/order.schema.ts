/* eslint-disable no-unused-vars */
import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: false },
    orderStatus: { type: String, required: true, default: 'Pending' },
    userId: { type: String, required: true },
    storeId: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    cartItems: [
      {
        menuName: { type: String, required: true },
        amount: { type: Number, required: true },
        options: [
          {
            name: { type: String, required: false },
            cost: { type: Number, required: false },
            description: { type: String, required: false },
          },
        ],
        cost: { type: Number, required: true },
      },
    ],
    totalCost: { type: Number, required: true },
  },
  { timestamps: true },
);
