import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
export class CartItem {
  @IsString()
  menuId: string;

  @IsNumber()
  quantity: number;
}

export class UpsertCartDto {
  @IsString()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItem)
  cartItems: CartItem[];
}
