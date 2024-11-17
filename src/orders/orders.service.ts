import { HttpException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(userId: string) {
    try {
      const userCart = await this.dbService.cart.findFirst({
        where: {
          userId,
        },
        include: {
          cartItems: {
            include: {
              Product: true,
            },
          },
        },
      });
      if (!userCart) {
        throw 'Cart not found. Please add items to your cart to place order.';
      }

      const order = await this.dbService.order.create({
        data: {
          User: {
            connect: {
              id: userId,
            },
          },
          orderItems: {
            createMany: {
              data: userCart.cartItems.map((_item) => ({
                productId: _item.Product.id,
                name: _item.Product.name,
                description: _item.Product.description,
                price: _item.Product.price,
                quantity: _item.quantity,
              })),
            },
          },
        },
      });

      await this.dbService.cart.deleteMany({
        where: {
          userId,
        },
      });

      return {
        data: order,
        message: 'Order successfully placed',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll(userId: string) {
    try {
      const orders = await this.dbService.order.findMany({
        where: {
          userId: userId,
        },
      });

      return {
        data: orders,
        message: 'Orders retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findOne(userId: string, orderId: string) {
    try {
      const order = await this.dbService.order.findFirstOrThrow({
        where: {
          AND: {
            userId,
            id: orderId,
          },
        },
        include: {
          orderItems: true,
          User: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      const subtotal = order.orderItems.reduce((total, _item) => {
        return total + _item.price * _item.quantity;
      }, 0);

      return {
        data: order,
        subtotal,
        message: 'Order retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
