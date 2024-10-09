import { Document } from 'mongoose';

export interface CartItem {
  menuId: string;
  amount: number;
  cost: number;
  sumCost: number;
}

export interface Order extends Document {
  orderId?: string;
  orderStatus: string;
  userId: string;
  deliveryAddress: string;
  storeName: string;
  cartItems: CartItem[];
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
}
