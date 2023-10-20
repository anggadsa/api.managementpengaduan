import { Test, TestingModule } from '@nestjs/testing';
import { BuktiPendukungController } from './bukti-pendukung.controller';

describe('BuktiPendukungController', () => {
  let controller: BuktiPendukungController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuktiPendukungController],
    }).compile();

    controller = module.get<BuktiPendukungController>(BuktiPendukungController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
