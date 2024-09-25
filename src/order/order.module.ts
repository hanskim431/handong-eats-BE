import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './model/order.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PaymentModule } from 'src/payment/payment.module';
import { MenuModule } from 'src/menu/menu.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    PaymentModule,
    MenuModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
