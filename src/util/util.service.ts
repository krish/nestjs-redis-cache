import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  constructor(@InjectRedis() private redis: Redis) {}

  async cacheList(key: string, data: any[], ttl: number) {
    const pipleline = this.redis.pipeline();
    data.forEach( (element) =>
      pipleline.rpush(key, JSON.stringify(element)),
    );
    pipleline.expire(key, ttl);
    await pipleline.exec();
  }

  async readListFromCache(key: string, start: number, end: number) {
    return await this.redis.lrange(key, start, end);
  }
}
