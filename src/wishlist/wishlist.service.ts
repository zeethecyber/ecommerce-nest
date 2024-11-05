import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WishlistService {
  constructor(private readonly dbService: DatabaseService) {}
  async create(createWishlistDto: CreateWishlistDto) {
    try {
      const wishlist = await this.dbService.wishlist.create({
        data: {
          productId: createWishlistDto.productId,
          userId: '', // TODO: Add userId
        },
      });
      return {
        data: wishlist,
        message: 'Product has been added to wishlist successfully',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll(userId: string) {
    try {
      const wishlist = await this.dbService.wishlist.findMany({
        where: {
          userId: userId,
        },
      });

      return {
        data: wishlist,
        message: 'Wishlist has been retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async remove(id: string) {
    try {
      await this.dbService.wishlist.delete({
        where: {
          id: id,
        },
      });

      return {
        data: null,
        message: 'Product has been removed from wishlist successfully',
      };
    } catch (error) {
      throw new HttpException(
        error?.meta?.cause || 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
