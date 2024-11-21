import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/DigiShop'),
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/uploads'),
      // Tell NestJS to serve the files under ~/uploads/
      serveRoot: '/uploads/',
    }),
    ProductsModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
