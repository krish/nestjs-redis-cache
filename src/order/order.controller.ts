import { Controller, Get, Param, Query } from '@nestjs/common';
import { skip } from 'rxjs';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/:category')
  async fetchOrders(
    @Param('category') category: string,
    @Query('skip') skip: string,
    @Query('take') take: string,
  ) {
    return await this.orderService.getAllOrders(
      category,
      parseInt(skip),
      parseInt(take),
    );
  }
}
