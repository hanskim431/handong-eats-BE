import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PayCostDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;
}
