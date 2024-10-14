import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Option {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}

class CartItem {
  @IsString()
  @IsNotEmpty()
  menuName: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsArray()
  @IsNotEmpty()
  options: Option[];

  @IsNumber()
  @IsNotEmpty()
  cost: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  storeId: string;

  @IsString()
  @IsNotEmpty()
  deliveryAddress: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CartItem)
  cartItems: CartItem[];

  @IsNumber()
  @IsNotEmpty()
  totalCost: number;
}
