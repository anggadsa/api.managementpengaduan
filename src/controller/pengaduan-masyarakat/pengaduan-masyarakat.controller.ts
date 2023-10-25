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
// import Static from 'src/static/static';
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
    return response.status(200).json({
      data: result[0],
      page: result[1],
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
    return response.status(200).json({
      message: 'Data Berhasil Didapatkan',
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
    return response.status(201).json({
      message: 'Data berhasil ditambahkan',
      result,
    });
  }

  @Post('submit/:id')
  async submit(
    @Param('id') id: string,
    @Body(ValidationPipe) body: UpdatePengaduanMasyarakat,
    @Req() request: Request,
    @Res() response: any,
  ): Promise<PengaduanMasyarakatModel> {
    const result =
      await this.pengaduanMasyarakatService.submitPengaduanMasyarakat(id);
    return response.status(201).json({
      message: 'Berhasil melakukan submit',
      result,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
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
        message: 'Data berhasil diubah',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteBook(
    @Param('id') id: string,
    @Req() request,
    @Res() response,
  ): Promise<any> {
    try {
      const result =
        await this.pengaduanMasyarakatService.deletePengaduanMasyarakat(id);
      return response.status(204).json({
        message: 'Successfully Delete Data',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }
}
