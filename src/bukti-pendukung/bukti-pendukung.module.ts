import { Module } from '@nestjs/common';
import { BuktiPendukungService } from './bukti-pendukung.service';
import { BuktiPendukungController } from './bukti-pendukung.controller';
import { PrismaService } from 'src/prisma.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  imports: [MinioClientModule],
  providers: [BuktiPendukungService, PrismaService, FileUploadService],
  controllers: [BuktiPendukungController],
})
export class BuktiPendukungModule {}
