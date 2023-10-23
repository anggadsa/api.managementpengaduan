import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BuktiPendukungService } from './bukti-pendukung.service';
// import { PengaduanMasyarakat_BuktiPendukungModel } from '@prisma/client';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/model/external/file-model';
import { AuthGuard } from 'src/auth/auth.guard';
import { PengaduanMasyarakat_BuktiPendukungModel } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller()
export class BuktiPendukungController {
  constructor(
    private readonly buktiPendukungService: BuktiPendukungService,
    private fileUploadService: FileUploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: BufferedFile,
    @Body() body,
  ): Promise<PengaduanMasyarakat_BuktiPendukungModel> {
    const uploadFile = await this.fileUploadService.uploadSingle(file);
    const { filename } = uploadFile;
    const { id } = body;
    const data = {
      pengaduanMasyarakatModelId: id,
      buktiFile: filename,
    };
    const { pengaduanMasyarakatModelId, buktiFile } = data;
    return this.buktiPendukungService.createBuktiPendukung({
      buktiFile,
      pengaduanMasyarakatModel: {
        connect: { id: pengaduanMasyarakatModelId },
      },
    });
  }
}
