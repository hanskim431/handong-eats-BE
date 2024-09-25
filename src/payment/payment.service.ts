import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PaymentService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly userService: UsersService,
  ) {}

  async payPrice(userId: string, price: number) {
    const user = await this.userService
      .findOneByUserID(userId)
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::payment.payPrice-${error}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (!user) {
      throw new HttpException(
        `NOT_FOUND::payment.payPrice-invalied user`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.point >= price) {
      throw new HttpException(
        'BAD_REQUEST::payment.payPrice-leak of points',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userService.update(userId, { point: user.point - price });

    return true;
  }
}
