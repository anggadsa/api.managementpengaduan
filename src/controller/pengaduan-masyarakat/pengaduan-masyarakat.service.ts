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
    sortBy,
    isSortAscending,
    pageIndex,
    pageSize,
    filter,
  }: {
    where?: any;
    isSortAscending?: any;
    sortBy?: any;
    pageIndex?: number;
    pageSize?: number;
    orderBy?: Prisma.PengaduanMasyarakatModelOrderByWithRelationInput;
    page?: number;
    perPage?: number;
    filter?: DateFilter;
  }): Promise<any> {
    const paginate: PaginatorTypes.PaginateFunction = paginator({
      perPage: pageSize,
    });

    if (filter?.recInsert) {
      const startDate = {
        gte: filter.recInsert
          ? DateTime.fromISO(filter.recInsert).startOf('day').toString()
          : DateTime.now().startOf('day').toString(),
      };
      filter.recInsert = startDate;
    }

    const pagination = await paginate<
      PengaduanMasyarakatModel,
      Prisma.PengaduanMasyarakatModelFindManyArgs
    >(
      this.prisma.pengaduanMasyarakatModel,
      {
        where: filter,
        orderBy: { [sortBy]: isSortAscending === 'true' ? 'asc' : 'desc' },
      },
      {
        page: pageIndex,
        perPage: pageSize,
      },
    );

    const page = {
      count: pagination.meta.total,
      pageIndex: pagination.meta.currentPage,
      pageSize: pagination.meta.lastPage,
      isFirstPage: pageIndex == 1 ? true : false,
      isLastPage: pagination.meta.next == null ? true : false,
    };

    return [pagination.data, page];
  }

  async getPengaduanMasyarakat(
    id: string,
  ): Promise<PengaduanMasyarakatModel | null> {
    return this.prisma.pengaduanMasyarakatModel.findUnique({
      where: { id: String(id) },
    });
  }

  async createPengaduanMasyarakat(data: CreatePengaduanMasyarakatDto) {
    try {
      const IdIsExist = await this.prisma.pengaduanMasyarakatModel.findFirst({
        where: {
          notarisId: data.notarisId,
          nomerSuratKuasa: data.nomerSuratKuasa,
        },
      });
      if (IdIsExist) {
        console.log(IdIsExist);
        throw new UnprocessableEntityException('Id Is Exist');
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2022: Unique constraint failed
        // Prisma error codes: https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
        if (error.code === 'P2002') {
          throw new UnprocessableEntityException(
            `The character already exists`,
          );
        }
      }
      throw error;
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
