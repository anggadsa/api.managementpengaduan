import { Test, TestingModule } from '@nestjs/testing';
import { BuktiPendukungService } from './bukti-pendukung.service';

describe('BuktiPendukungService', () => {
  let service: BuktiPendukungService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuktiPendukungService],
    }).compile();

    service = module.get<BuktiPendukungService>(BuktiPendukungService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
