import { IsString, IsNumber } from 'class-validator';

export class CartItemDto {
  @IsString()
  menuId: string;

  @IsNumber()
  quantity: number;
}
