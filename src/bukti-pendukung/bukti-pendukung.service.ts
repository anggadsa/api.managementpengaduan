import { Injectable } from '@nestjs/common';
import {
  PengaduanMasyarakat_BuktiPendukungModel,
  Prisma,
} from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
// import { CreatePengaduanMasyarakat_BuktiPendukungModelDto } from './dto/create-bukti-pendukung.dto';

@Injectable()
export class BuktiPendukungService {
  constructor(private prisma: PrismaService) {}

  async createBuktiPendukung(
    data: Prisma.PengaduanMasyarakat_BuktiPendukungModelCreateInput,
  ): Promise<PengaduanMasyarakat_BuktiPendukungModel> {
    const buktiData =
      this.prisma.pengaduanMasyarakat_BuktiPendukungModel.create({
        data,
      });
    return buktiData;
  }
}
