import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from './model/menu.interface';

@Injectable()
export class MenuService {
  // eslint-disable-next-line no-unused-vars
  constructor(@InjectModel('Menu') private readonly menuModel: Model<Menu>) {}

  async findAll(): Promise<Menu[] | null> {
    return await this.menuModel
      .find()
      .exec()
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::menu.findOneByMenuID-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async findOneByMenuID(menuID: string): Promise<Menu | null> {
    const menu = await this.menuModel
      .where({ menuID: menuID })
      .findOne()
      .exec()
      .catch((error) => {
        throw new HttpException(
          `INTERNAL_SERVER_ERROR::menu.findOneByMenuID-${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    return menu;
  }
}
