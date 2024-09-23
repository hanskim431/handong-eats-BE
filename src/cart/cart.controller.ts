import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { UpsertCartDto } from './dto/upsert-cart.dto';

@Controller('cart')
export class CartController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly cartService: CartService) {}

  @Post(':id')
  upsert(@Param('id') userId: string, @Body() upsertCartDto: UpsertCartDto) {
    return this.cartService.upsert(userId, upsertCartDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOneByUserID(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
