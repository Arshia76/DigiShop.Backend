import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { AccessJwtAuthGuard } from '../auth/guard/jwt-access-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { Role } from '@/shared/enum';
import { CurrentUserGuard } from '../auth/guard/current-user.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('')
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Get('/currentUser')
  @UseGuards(AccessJwtAuthGuard, CurrentUserGuard)
  getCurrentUserOrders() {
    return this.ordersService.getCurrentUserOrders();
  }

  @Post('/create')
  @UseGuards(AccessJwtAuthGuard, CurrentUserGuard)
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }
}
