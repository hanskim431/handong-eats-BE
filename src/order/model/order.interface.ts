import { Document } from 'mongoose';

export interface CartItem {
  menuId: string;
  amount: number;
  price: number;
  sumPrice: number;
}

export interface Order extends Document {
  orderId?: string;
  orderStatus: string;
  userId: string;
  deliveryAddress: string;
  storeName: string;
  cartItems: CartItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
