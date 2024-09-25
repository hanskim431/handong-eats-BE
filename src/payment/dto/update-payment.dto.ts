import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PayPriceDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
