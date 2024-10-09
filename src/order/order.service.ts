import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuService } from 'src/menu/menu.service';
import { PaymentService } from 'src/payment/payment.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './model/order.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') // eslint-disable-next-line no-unused-vars
    private readonly orderModel: Model<Order>,
    // eslint-disable-next-line no-unused-vars
    private readonly menuService: MenuService,
    // eslint-disable-next-line no-unused-vars
    private readonly paymentService: PaymentService,
  ) {}

  async create(orderData: CreateOrderDto): Promise<Order> {
    let totalCost: number = 0;

    for (const [index, element] of orderData.cartItems.entries()) {
      const menu = await this.menuService.findOneByMenuID(element.menuId);
      if (!menu)
        throw new HttpException(
          'NOT_FOUND:::order.create.findOneByMenuID',
          HttpStatus.NOT_FOUND,
        );

      orderData.cartItems[index].cost = menu.cost;
      orderData.cartItems[index].sumCost = menu.cost * element.amount;
      totalCost += orderData.cartItems[index].sumCost;
    }

    orderData.totalCost = totalCost;

    await this.paymentService.payCost(orderData.userId, totalCost);

    const newOrder = new this.orderModel({
      ...orderData,
    });

    return await newOrder.save().catch((error) => {
      throw new HttpException(
        `INTERNAL_SERVER_ERROR::order.upsert-${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async updateOrderStatus(orderId: string, orderStatus: string) {
    const result = await this.orderModel
      .findByIdAndUpdate(orderId, { orderStatus: orderStatus }, { new: true })
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::cart.upsert-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    return result;
  }

  async findAllByUserId(userId: string) {
    const cart: Order[] | null[] = await this.orderModel
      .find({
        userId: userId,
      })
      .exec()
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::order.findAllByUserId-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return cart;
  }

  async findOneByUserId(userId: string) {
    const cart: Order | null = await this.orderModel
      .findOne({
        userId: userId,
      })
      .exec()
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::order.findAllByUserId-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return cart;
  }
}
