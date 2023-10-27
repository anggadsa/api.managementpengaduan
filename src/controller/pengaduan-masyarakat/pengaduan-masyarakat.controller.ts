import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
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
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { Role } from 'src/config/enum/role.enum';
import { BuktiPendukungService } from 'src/bukti-pendukung/bukti-pendukung.service';

@UseGuards(AuthGuard)
@Controller({ version: '1' })
export class PengaduanMasyarakatController {
  constructor(
    private readonly pengaduanMasyarakatService: PengaduanMasyarakatService,
    private readonly buktiPendukungService: BuktiPendukungService,
  ) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.PUBLIC)
  async index(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      //#region Get Param and User jwt payload from Auth Guard
      const param = request.query;
      const userId = request['user'];
      //#endregion

      // #region Set Default Filter id to UserId
      param.filter
        ? (param.filter['id'] = userId.id)
        : (param.filter = { id: userId.id });
      // #endregion

      const result = await this.pengaduanMasyarakatService.index(param);
      return response.status(200).json({
        data: result[0],
        page: result[1],
      });
    } catch (error) {
      throw new InternalServerErrorException('Request tidak dapat diproses');
    }
  }

  @Get(':id')
  async show(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any | undefined> {
    const result =
      await this.pengaduanMasyarakatService.getPengaduanMasyarakat(id);
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
