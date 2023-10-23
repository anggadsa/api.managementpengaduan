import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PengaduanMasyarakatService } from './pengaduan-masyarakat.service';
import { Request, Response } from 'express';
import { PengaduanMasyarakatModel } from '../../model/pengaduan-masyarakat/pengaduan-masyarakat.model';
import { CreatePengaduanMasyarakatDto } from '../../dto/create-pengaduan-masyarakat.dto';
import { UpdatePengaduanMasyarakat } from '../../dto/update-pengaduan-masyarakat.dto';
import Static from 'src/static/static';
import { AuthGuard } from 'src/auth/auth.guard';
import { BuktiPendukungService } from 'src/bukti-pendukung/bukti-pendukung.service';

@UseGuards(AuthGuard)
@Controller({ version: '1' })
export class PengaduanMasyarakatController {
  constructor(
    private readonly pengaduanMasyarakatService: PengaduanMasyarakatService,
    private readonly buktiPendukungService: BuktiPendukungService,
  ) {}

  @Get()
  async index(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const param = request.query;
    const result =
      await this.pengaduanMasyarakatService.getAllPengaduanMasyarakat(param);
    return response.status(201).json({
      message: 'Successfully fetch data!',
      data: result,
    });
  }

  @Get(':id')
  async show(
    @Param('id') Id: string,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any | undefined> {
    const result =
      await this.pengaduanMasyarakatService.getPengaduanMasyarakat(Id);
    return response.status(201).json({
      message: 'Successfully fetch data!',
      data: result,
    });
  }

  @Post()
  async create(
    @Body(ValidationPipe) body: CreatePengaduanMasyarakatDto,
    @Req() request: Request,
    @Res() response: any,
  ): Promise<PengaduanMasyarakatModel> {
    const result =
      await this.pengaduanMasyarakatService.createPengaduanMasyarakat(body);
    // const buktiPengaduan =
    //   await this.buktiPendukungService.createBuktiPendukung(pengaduan);
    // const result = await this.pengaduanMasyarakatService.getPengaduanMasyarakat(
    //   buktiPengaduan.PengaduanMasyarakatModelId,
    // );
    return response.status(201).json({
      message: 'Successfully fetch data!',
      data: result,
    });
  }

  @Put()
  async update(
    @Body('id') id: string,
    @Body(ValidationPipe) data: UpdatePengaduanMasyarakat,
    @Req() request,
    @Res() response,
  ): Promise<PengaduanMasyarakatModel> {
    try {
      const result =
        await this.pengaduanMasyarakatService.updatePengaduanMasyarakat(
          id,
          data,
        );

      return response.status(201).json({
        message: 'Successfully fetch data!',
        data: result,
      });
    } catch (error) {
      return response.status(Static.RES_BAD_REQUEST).json({
        code: Static.RES_BAD_REQUEST,
        message: error.meta.cause,
        data: [],
      });
    }
  }

  @Delete()
  async deleteBook(
    @Body('Id') Id: string,
    @Req() request,
    @Res() response,
  ): Promise<any | null> {
    const result =
      this.pengaduanMasyarakatService.deletePengaduanMasyarakat(Id);
    return response.status(204).json({
      message: 'Successfully fetch data!',
      data: result,
    });
  }
}
