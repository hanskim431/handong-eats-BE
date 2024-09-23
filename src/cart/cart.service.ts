import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpsertCartDto } from './dto/upsert-cart.dto';
import { Cart } from './model/cart.interface';

@Injectable()
export class CartService {
  // eslint-disable-next-line no-unused-vars
  constructor(@InjectModel('Cart') private readonly cartModel: Model<Cart>) {}

  async findOneByUserID(userID: string): Promise<Cart | null> {
    const cart = await this.cartModel
      .where({ userID: userID })
      .findOne()
      .exec()
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::cart.findOneByUserID-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return cart;
  }

  async upsert(userId: string, upsertCartDto: UpsertCartDto) {
    const existingCart: Cart | null = await this.cartModel.findOne({ userId });

    if (existingCart) {
      existingCart.cartItems = upsertCartDto.cartItems; // 카트 아이템을 업데이트하는 방법은 필요에 따라 수정 가능
      return await existingCart.save();
    } else {
      const newCart = new this.cartModel({
        userId,
        cartItems: upsertCartDto.cartItems,
      });
      return await newCart.save();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
