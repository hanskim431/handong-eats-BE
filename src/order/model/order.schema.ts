import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    orderStatus: { type: String, required: true },
    paymentStatus: { type: String, required: true, default: 'PENDING' },
    userId: { type: String, required: true },
    storeName: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    orderList: {
      cartItems: [
        {
          menuId: { type: String, required: true },
          quantity: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true },
);
