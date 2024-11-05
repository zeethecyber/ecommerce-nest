import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, CategoriesModule, SubcategoriesModule, ReviewsModule, OrdersModule, NotificationsModule, AuthModule, CartModule, WishlistModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
