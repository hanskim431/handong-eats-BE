import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpsertOrderDto } from './dto/upsert-order.dto';
import { Order } from './model/order.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<Order>,
  ) {}

  async upsert(upsertOrderDto: UpsertOrderDto) {
    const existingOrder: Order | null = await this.orderModel
      .findOne({
        userId: upsertOrderDto.userId,
      })
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::cart.upsert-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (existingOrder) {
      existingOrder.orderStatus = upsertOrderDto.orderStatus;
      return await existingOrder.save().catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::order.upsert-${error}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    } else {
      const newOrder = new this.orderModel({
        ...upsertOrderDto,
      });
      return await newOrder.save().catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::order.upsert-${error}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    }
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
