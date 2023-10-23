import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { BufferedFile } from 'src/model/external/file-model';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller()
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(@UploadedFile() file: BufferedFile) {
    return await this.fileUploadService.uploadSingle(file);
  }

  @Post('many')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
    ]),
  )
  async uploadMany(@UploadedFiles() files: BufferedFile) {
    return this.fileUploadService.uploadMany(files);
  }
}
