import { HttpException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}
  async findOne(email: string) {
    try {
      const user = await this.dbService.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw 'User not found';
      }
      return user;
    } catch (error) {
      throw new HttpException(error?.meta?.cause || 'User not found', 404);
    }
  }

  async register(data: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(
        data.password,
        +process.env.SALT_ROUNDS,
      );

      const newUser = await this.dbService.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          role: data.role,
        },
      });

      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(error?.meta?.cause || 'User not created', 500);
    }
  }
}
