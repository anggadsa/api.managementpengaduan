import { Module } from '@nestjs/common';
import { PengaduanMasyarakatModule } from './pengaduan-masyarakat/v1/pengaduan-masyarakat.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { BuktiPendukungModule } from './bukti-pendukung/bukti-pendukung.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    PengaduanMasyarakatModule,
    BuktiPendukungModule,
    MinioClientModule,
    FileUploadModule,
    AuthModule,
    UsersModule,
    RouterModule.register([
      {
        path: 'pengaduan-masyarakat',
        module: PengaduanMasyarakatModule,
        children: [
          {
            path: 'uploadBuktiPendukung',
            module: BuktiPendukungModule,
          },
          {
            path: 'auth',
            module: AuthModule,
          },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
