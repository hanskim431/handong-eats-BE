import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PaymentService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly userService: UsersService,
  ) {}

  async payCost(userId: string, cost: number) {
    const user = await this.userService
      .findOneByUserID(userId)
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::payment.payCost-${error}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (!user) {
      throw new HttpException(
        `NOT_FOUND::payment.payCost-invalied user`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.point >= cost) {
      throw new HttpException(
        'BAD_REQUEST::payment.payCost-leak of points',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userService.update(userId, { point: user.point - cost });

    return true;
  }
}
