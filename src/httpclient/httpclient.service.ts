import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpclientService {
  constructor(private http: HttpService) {}

  async getAllOreders(): Promise<any> {
    const ordersObs = this.http.get(
      'https://run.mocky.io/v3/6d0487ab-b553-45e6-804b-90bcd09b114f',
    );
    return await (
      await firstValueFrom(ordersObs)
    ).data;
  }
}
