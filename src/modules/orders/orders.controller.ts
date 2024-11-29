import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { AccessJwtAuthGuard } from '../auth/guard/jwt-access-auth.guard';
import { AdminGuard } from '../auth/guard/admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUserGuard } from '../auth/guard/current-user.guard';

@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('')
  @UseGuards(AccessJwtAuthGuard, AdminGuard)
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  @UseGuards(AccessJwtAuthGuard)
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }

  @Get('/currentUser')
  @UseGuards(AccessJwtAuthGuard)
  getCurrentUserOrders() {
    return this.ordersService.getCurrentUserOrders();
  }

  @Post('/create')
  @UseGuards(AccessJwtAuthGuard)
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }
}
