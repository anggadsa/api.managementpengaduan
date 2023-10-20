import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PengaduanMasyarakatModel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePengaduanMasyarakatDto } from './dto/create-pengaduan-masyarakat.dto';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';
import { DateTime } from 'luxon';

export interface QueryFilter extends PengaduanMasyarakatModel {
  ({});
}

export interface DateFilter extends Omit<QueryFilter, 'RecInsert'> {
  RecInsert: any;
}

@Injectable()
export class PengaduanMasyarakatService {
  constructor(private prisma: PrismaService) {}

  async getAllPengaduanMasyarakat({
    orderBy,
    page,
    perPage,
    filter,
  }: {
    where?: any;
    orderBy?: Prisma.PengaduanMasyarakatModelOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    filter?: DateFilter;
  }): Promise<PaginatorTypes.PaginatedResult<PengaduanMasyarakatModel>> {
    // try {
    const paginate: PaginatorTypes.PaginateFunction = paginator({
      perPage: perPage,
    });

    if (filter?.RecInsert) {
      const startDate = {
        gte: filter.RecInsert
          ? DateTime.fromISO(filter.RecInsert).startOf('day').toString()
          : DateTime.now().startOf('day').toString(),
      };
      filter.RecInsert = startDate;
      console.log(filter.RecInsert);
    }

    return await paginate<
      PengaduanMasyarakatModel,
      Prisma.PengaduanMasyarakatModelFindManyArgs
    >(
      this.prisma.pengaduanMasyarakatModel,
      {
        where: filter,
        select: {
          Id: true,
          JenisPerkara: true,
          NamaPelapor: true,
          NamaKuasaHukum: true,
          RecInsert: true,
        },
        orderBy,
      },
      {
        page,
        perPage,
      },
    );
  }

  async getPengaduanMasyarakat(
    Id: string,
  ): Promise<PengaduanMasyarakatModel | null> {
    return this.prisma.pengaduanMasyarakatModel.findUnique({
      where: { Id: String(Id) },
    });
  }

  async createPengaduanMasyarakat(
    data: CreatePengaduanMasyarakatDto,
  ): Promise<PengaduanMasyarakatModel> {
    const IdIsExist = await this.getPengaduanMasyarakatId(data.Id);
    if (IdIsExist) {
      throw new UnprocessableEntityException('Id already exists');
    } else {
      data.TanggalLahir = new Date(data.TanggalLahir);
      data.TanggalSuratKuasa = new Date(data.TanggalSuratKuasa);
      data.RecInsert = new Date(data.RecInsert);
      data.RecUpdate = new Date(data.RecUpdate);
      data.TanggalVerifikasi = new Date(data.TanggalVerifikasi);
      return await this.prisma.pengaduanMasyarakatModel.create({
        data,
      });
    }
  }

  async updatePengaduanMasyarakat(
    Id: string,
    data: PengaduanMasyarakatModel,
  ): Promise<PengaduanMasyarakatModel> {
    return this.prisma.pengaduanMasyarakatModel.update({
      where: { Id: String(Id) },
      data: {
        Id: data.Id,
        JenisPerkara: data.JenisPerkara,
        DetailLaporan: data.DetailLaporan,
      },
    });
  }

  async deletePengaduanMasyarakat(Id: string): Promise<any> {
    const IsExist = await this.getPengaduanMasyarakatId(Id);
    if (IsExist === null) return console.log('Id Not Found');
    return this.prisma.pengaduanMasyarakatModel.delete({
      where: { Id: String(Id) },
    });
  }

  private async getPengaduanMasyarakatId(Id: string): Promise<any> {
    return this.prisma.pengaduanMasyarakatModel.findUnique({
      where: { Id: String(Id) },
    });
  }
}
