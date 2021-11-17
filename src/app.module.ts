import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { UtilService } from './util/util.service';
import { HttpclientService } from './httpclient/httpclient.service';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    OrderModule,
    HttpModule,
    RedisModule.forRoot({ config: { url: 'localhost:6379' } }),
  ],
  controllers: [AppController],
  providers: [AppService, UtilService, HttpclientService],
  exports: [HttpclientService, UtilService],
})
export class AppModule {}
