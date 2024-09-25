import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UpsertOrderDto } from './dto/upsert-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // TODO: Auth Guard
  @Post()
  upsert(@Body() upsertOrderDto: UpsertOrderDto) {
    return this.orderService.upsert(upsertOrderDto);
  }

  // TODO: Auth Guard
  @Get(':id')
  findAllByUserId(@Param('id') id: string) {
    return this.orderService.findAllByUserId(id);
  }

  // TODO: Auth Guard
  @Get(':id/recent')
  findOneByUserId(@Param('id') id: string) {
    return this.orderService.findOneByUserId(id);
  }
}
