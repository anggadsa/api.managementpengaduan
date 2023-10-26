import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    isSortAscending = true,
    pageIndex,
    pageSize,
    filter,
  }: {
    where?: any;
    isSortAscending?: boolean;
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
        orderBy: sortBy
          ? {
              [sortBy]: isSortAscending ? 'asc' : 'desc',
            }
          : undefined,
      },
      {
        page: pageIndex,
        perPage: pageSize,
      },
    );

    const page = {
      count: pagination.meta.total,
      pageIndex: pagination.meta.currentPage,
      pageSize: pageSize | 0,
      isFirstPage: pageIndex == 1 ? true : false,
      isLastPage: pagination.meta.next == null ? true : false,
    };

    return [pagination.data, page];
  }

  async getPengaduanMasyarakat(id: string): Promise<PengaduanMasyarakatModel> {
    try {
      const findById =
        await this.prisma.pengaduanMasyarakatModel.findUniqueOrThrow({
          where: { id: id },
        });
      return findById;
    } catch (error) {
      throw new NotFoundException('Id tidak ditemukan');
    }
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
        throw new UnprocessableEntityException('Id Telah digunakan');
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
          throw new UnprocessableEntityException(`id sudah dipakai`);
        }
      }
      throw error;
    }
  }

  async updatePengaduanMasyarakat(
    id: string,
    data: UpdatePengaduanMasyarakat,
  ): Promise<PengaduanMasyarakatModel> {
    try {
      const IdIsExist = await this.getPengaduanMasyarakatId(id);
      if (!IdIsExist) {
        throw new NotFoundException('Id tidak ditemukan');
      }
      const merged = Object.assign({}, IdIsExist, data);
      merged.recUpdate = new Date();

      return await this.prisma.pengaduanMasyarakatModel.update({
        where: { id: String(id) },
        data: { ...merged },
      });
    } catch (error) {
      throw error;
    }
  }

  async deletePengaduanMasyarakat(id: string) {
    try {
      const IdIsExist = await this.getPengaduanMasyarakatId(id);
      if (IdIsExist === null) {
        throw new UnprocessableEntityException('Data tidak ditemukan');
      }

      return await this.prisma.pengaduanMasyarakatModel.delete({
        where: { id: String(id) },
      });
    } catch (error) {
      throw error;
    }
  }

  async submitPengaduanMasyarakat(id: string) {
    // console.log(id);
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
