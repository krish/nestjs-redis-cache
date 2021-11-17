import { Injectable } from '@nestjs/common';
import { groupBy } from 'lodash';
import { HttpclientService } from 'src/httpclient/httpclient.service';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class OrderService {
  constructor(private http: HttpclientService, private cache: UtilService) {}

  async getAllOrders(category: string) {
    const key = `OrderService:orders:group:${category}`;

    const cached = await this.cache.readListFromCache(key, 0, -1);
    if (cached && cached.length > 0) {
      console.log('cache found');
      return cached.map((element) => JSON.parse(element));
    } else {
      console.log('cache missed');
      const data = await this.http.getAllOreders();
      const groupedData = this.groupData(data);
      await this.cache.cacheList(key, groupedData, 60);
      console.log('cached success');
      return groupedData;
    }
  }

  private groupData(orders: any[]) {
    const groupedOrders = [].concat(
      [],
      ...orders
        .map((order) =>
          groupBy(
            order['orderLines'],
            (orderLine) =>
              `${orderLine.orderNumber}||${orderLine.storeLocation}||${orderLine.deliveryLocation?.name}||${orderLine.item.mode.config.name}`,
          ),
        )
        .map((order) =>
          Object.keys(order).map((key) => ({ key, data: order[key] })),
        ),
    );
    return groupedOrders;
  }
}
