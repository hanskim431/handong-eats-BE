import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpsertCartDto } from './dto/upsert-cart.dto';
import { Cart } from './model/cart.interface';
import { error } from 'console';
import { DeleteResult } from 'mongodb';

@Injectable()
export class CartService {
  // eslint-disable-next-line no-unused-vars
  constructor(@InjectModel('Cart') private readonly cartModel: Model<Cart>) {}

  async findOneByUserID(userId: string): Promise<Cart | null> {
    const cart: Cart | null = await this.cartModel
      .findOne({
        userId: userId,
      })
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::cart.findOneByUserID-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return cart;
  }

  async upsert(userId: string, upsertCartDto: UpsertCartDto) {
    const existingCart: Cart | null = await this.cartModel
      .findOne({
        userId: userId,
      })
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::cart.upsert-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    if (existingCart) {
      existingCart.cartItems = upsertCartDto.cartItems;
      return await existingCart.save();
    } else {
      const newCart = new this.cartModel({
        userId,
        cartItems: upsertCartDto.cartItems,
      });
      return await newCart.save();
    }
  }

  async remove(userId: string): Promise<DeleteResult> {
    return await this.cartModel
      .deleteOne({ userId: userId })
      .exec()
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::cart.upsert-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
