import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { Order } from './order.schema';
import { Model } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}
  async getOrders() {
    return this.orderModel.find().lean();
  }

  async getCurrentUserOrders() {
    // @ts-ignore
    const userId = this.request?.user.id;

    return this.orderModel.find({ user: userId }).populate('user').lean();
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const data = {
      ...createOrderDto,
      totalAmount: Number(createOrderDto.totalAmount),
      // @ts-ignore
      user: this.request?.user.id,
    };
    const order = await this.orderModel.create(data);
    return order.toJSON();
  }
}
