import { Document } from 'mongoose';

export interface CartItem {
  menuId: string;
  quantity: number;
}

export interface OrderList {
  cartItems: CartItem[];
}

export interface Order extends Document {
  orderId: string;
  orderStatus: string;
  paymentStatus: string;
  userId: string;
  storeName: string;
  deliveryAddress: string;
  orderList: OrderList;
  createdAt: Date;
  updatedAt: Date;
}
