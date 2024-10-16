import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { GetUser } from 'src/utils/get-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // TODO: Auth Guard
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: any) {
    const userId = user.userId;
    const orderData = {
      ...createOrderDto,
      userId,
      cartItems: [...createOrderDto.cartItems],
    };

    return this.orderService.create(orderData);
  }

  @Patch('status')
  updateOrderStatus(@Body() updateOrderDto: UpdateOrderDto) {
    const { orderId, orderStatus } = updateOrderDto;
    return this.orderService.updateOrderStatus(orderId, orderStatus);
  }

  @Get('my')
  findAllByUserId(@GetUser() userToken: any) {
    const userId = userToken.userId;
    return this.orderService.findAllByUserId(userId);
  }

  // TODO: Auth Guard
  @Get('my/recent')
  findOneByUserId(@GetUser() userToken: any) {
    const userId = userToken.userId;
    return this.orderService.findOneByUserId(userId);
  }

  // TODO: Auth Guard
  @Get('store')
  findAllByStoreId(@GetUser() userToken: any) {
    const storeId = userToken.userId;
    return this.orderService.findAllByStoreId(storeId);
  }

  // TODO: Auth Guard
  @Get('store/one')
  findOneByStoreId(@GetUser() userToken: any) {
    const storeId = userToken.userId;
    return this.orderService.findOneByStoreId(storeId);
  }
}
