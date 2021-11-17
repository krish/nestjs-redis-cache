import { Test, TestingModule } from '@nestjs/testing';
import { HttpclientService } from './httpclient.service';

describe('HttpclientService', () => {
  let service: HttpclientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpclientService],
    }).compile();

    service = module.get<HttpclientService>(HttpclientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
