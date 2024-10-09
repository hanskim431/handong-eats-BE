import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CartItem {
  @IsString()
  @IsNotEmpty()
  menuId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  cost?: number;

  sumCost?: number;
}

export class CreateOrderDto {
  // TODO: random orderId
  orderId?: string;

  @IsString()
  @IsNotEmpty()
  orderStatus: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  storeName: string;

  @IsString()
  @IsNotEmpty()
  deliveryAddress: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CartItem)
  cartItems: CartItem[];

  totalCost: number;
}
