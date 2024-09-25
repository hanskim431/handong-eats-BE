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
  quantity: number;
}

class OrderList {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CartItem)
  cartItems: CartItem[];
}

export class UpsertOrderDto {
  // TODO: random orderId
  @IsString()
  @IsNotEmpty()
  orderId: string;

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
  @ValidateNested()
  @Type(() => OrderList)
  orderList: OrderList;
}
