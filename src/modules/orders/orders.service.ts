import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Order } from './order.schema';
import { Model } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject(REQUEST) private readonly request: Request,
    private readonly productsService: ProductsService,
  ) {}
  async getOrders() {
    return this.orderModel.find().lean();
  }

  async getOrder(id: string) {
    return this.orderModel.findById(id).lean();
  }

  async getCurrentUserOrders() {
    // @ts-ignore
    const userId = this.request?.user.id;

    return this.orderModel.find({ user: userId }).populate('user').lean();
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    let products = [];

    for (const product of createOrderDto.products) {
      const p = await this.productsService.getProduct(product.productId);
      if (!p) throw new BadRequestException('محصولات مورد نظر یافت نشد');
      if (p.quantity < Number(product.selectedQuantity))
        throw new BadRequestException('تعداد وارد شده صحیح نمی باشد');
      const orderProduct = {
        productId: p._id,
        title: p.title,
        price: p.price,
        quantity: Number(product.selectedQuantity),
      };
      products.push(orderProduct);
    }
    const totalAmount = Number(
      products.reduce(
        (total, current) => (total += current.quantity * current.price),
        0,
      ),
    );

    const data = {
      address: createOrderDto.address,
      products,
      totalAmount,
      // @ts-ignore
      user: this.request?.user.id,
    };
    const order = await this.orderModel.create(data);
    return order.toJSON();
  }
}
