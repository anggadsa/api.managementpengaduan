import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PengaduanMasyarakatModel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePengaduanMasyarakatDto } from '../../dto/create-pengaduan-masyarakat.dto';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';
import { DateTime } from 'luxon';
import { Status } from '@prisma/client';
import { UpdatePengaduanMasyarakat } from 'src/dto/update-pengaduan-masyarakat.dto';

export interface QueryFilter extends PengaduanMasyarakatModel {
  ({});
}

export interface DateFilter extends Omit<QueryFilter, 'recInsert'> {
  recInsert: any;
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

    if (filter?.recInsert) {
      const startDate = {
        gte: filter.recInsert
          ? DateTime.fromISO(filter.recInsert).startOf('day').toString()
          : DateTime.now().startOf('day').toString(),
      };
      filter.recInsert = startDate;
      console.log(filter.recInsert);
    }

    return await paginate<
      PengaduanMasyarakatModel,
      Prisma.PengaduanMasyarakatModelFindManyArgs
    >(
      this.prisma.pengaduanMasyarakatModel,
      {
        where: filter,
        select: {
          id: true,
          jenisPerkara: true,
          namaPelapor: true,
          namaKuasaHukum: true,
          recInsert: true,
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
    id: string,
  ): Promise<PengaduanMasyarakatModel | null> {
    return this.prisma.pengaduanMasyarakatModel.findUnique({
      where: { id: String(id) },
    });
  }

  async createPengaduanMasyarakat(
    data: CreatePengaduanMasyarakatDto,
  ): Promise<PengaduanMasyarakatModel> {
    const IdIsExist = await this.getPengaduanMasyarakatId(data.id);
    if (IdIsExist) {
      throw new UnprocessableEntityException('Id already exists');
    } else {
      data.tanggalLahir = new Date(data.tanggalLahir);
      data.tanggalSuratKuasa = new Date(data.tanggalSuratKuasa);
      data.recInsert = new Date(data.recInsert);
      data.recUpdate = new Date(data.recUpdate);
      data.tanggalVerifikasi = new Date(data.tanggalVerifikasi);
      data.status = Status.draft;
      return await this.prisma.pengaduanMasyarakatModel.create({
        data,
      });
    }
  }

  async updatePengaduanMasyarakat(
    id: string,
    data: PengaduanMasyarakatModel,
  ): Promise<PengaduanMasyarakatModel> {
    return this.prisma.pengaduanMasyarakatModel.update({
      where: { id: String(id) },
      data: {
        id: data.id,
        jenisPerkara: data.jenisPerkara,
        detailLaporan: data.detailLaporan,
      },
    });
  }

  async deletePengaduanMasyarakat(id: string): Promise<any> {
    const IsExist = await this.getPengaduanMasyarakatId(id);
    if (IsExist === null) return console.log('id Not Found');
    return this.prisma.pengaduanMasyarakatModel.delete({
      where: { id: String(id) },
    });
  }

  async submitPengaduanMasyarakat(
    id: string,
  ): Promise<UpdatePengaduanMasyarakat> {
    console.log(id);
    return this.prisma.pengaduanMasyarakatModel.update({
      where: { id: String(id) },
      data: {
        status: Status.menungguVerifikasi,
      },
    });
  }

  private async getPengaduanMasyarakatId(id: string): Promise<any> {
    return this.prisma.pengaduanMasyarakatModel.findUnique({
      where: { id: String(id) },
    });
  }
}
