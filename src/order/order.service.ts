import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuService } from 'src/menu/menu.service';
import { PaymentService } from 'src/payment/payment.service';
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

  async create(orderData: any): Promise<Order> {
    const totalCost: number = orderData.totalCost;

    orderData.orderStatus = 'Pending';

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
    const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000); // 1분 전 시간 계산

    const cart: Order | null = await this.orderModel
      .findOne({
        userId: userId,
        orderStatus: { $nin: ['Finished'] },
        // 'Rejected' 상태인 경우, updatedAt이 1분 이내인 것만 조회
        $or: [
          { orderStatus: { $ne: 'Rejected' } }, // Rejected가 아닌 경우는 모두 허용
          { orderStatus: 'Rejected', updatedAt: { $gte: oneMinuteAgo } }, // Rejected인데 1분 이내인 경우만 허용
        ],
      })
      .sort({ createdAt: -1 })
      .exec()
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::order.findAllByUserId-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (cart == null) {
      throw new HttpException('No Order Here', HttpStatus.NOT_FOUND);
    }

    return cart;
  }

  async findAllByStoreId(storeId: string) {
    const cart: Order[] | null[] = await this.orderModel
      .find({
        storeId: storeId,
      })
      .sort({ createdAt: -1 })
      .exec()
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::order.findAllByUserId-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return cart;
  }

  async findOneByStoreId(storeId: string) {
    const cart: Order | null = await this.orderModel
      .findOne({
        storeId: storeId,
        orderStatus: { $nin: ['Rejected', 'Finished'] },
      })
      .exec()
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::order.findOneByStoreId-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    return cart;
  }
}
