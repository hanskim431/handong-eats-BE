import { Document } from 'mongoose';

export interface CartItem {
  menuId: string;
  quantity: number;
}

export interface Cart extends Document {
  userId: string;
  cartItems: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}
