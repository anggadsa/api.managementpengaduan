import { Module } from '@nestjs/common';
import { PengaduanMasyarakatController } from './pengaduan-masyarakat.controller';
import { PengaduanMasyarakatService } from './pengaduan-masyarakat.service';
import { PrismaService } from 'src/prisma.service';
import { BuktiPendukungService } from 'src/bukti-pendukung/bukti-pendukung.service';
// import { IsIdNotRegistered } from './dto/validation-rules/id-not-registered.rule';

@Module({
  controllers: [PengaduanMasyarakatController],
  providers: [PengaduanMasyarakatService, PrismaService, BuktiPendukungService],
})
export class PengaduanMasyarakatModule {}
