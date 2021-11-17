import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/:category')
  async fetchOrders(@Param('category') category: string) {
    return await this.orderService.getAllOrders(category);
  }
}
