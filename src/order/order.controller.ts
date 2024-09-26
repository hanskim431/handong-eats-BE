import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // TODO: Auth Guard
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    const orderData = {
      ...createOrderDto,
      cartItems: [...createOrderDto.cartItems],
    };

    return this.orderService.create(orderData);
  }

  @Patch('status')
  updateOrderStatus(@Body() updateOrderDto: UpdateOrderDto) {
    const { orderId, orderStatus } = updateOrderDto;
    return this.orderService.updateOrderStatus(orderId, orderStatus);
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
