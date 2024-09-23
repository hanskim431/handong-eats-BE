import { Document } from 'mongoose';

export interface Menu extends Document {
  menuID: string;
  name: string;
  price: number;
  store: string;
  description: string;
  isActive: boolean;
}
