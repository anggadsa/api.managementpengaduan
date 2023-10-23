import { Status } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { AgamaState } from 'src/config/enum/agama.enum';

export class UpdatePengaduanMasyarakat {
  @IsOptional()
  id: string;

  @IsOptional()
  jenisKelamin: string;
  alamatPelapor: string;
  alamatKantorSuratKuasa: string;
  jenisPerkara: string;
  userId: string;
  namaPelapor: string;
  tanggalLahir: Date;
  tempatLahir: string;

  @IsOptional()
  @IsEnum(AgamaState)
  agama: AgamaState | string;

  @IsOptional()
  pekerjaan: string;
  nik: string;
  nikFiles: string;
  noHandphone: string;
  email: string;
  notarisId: string;
  namaNotaris: string;
  wilayahNotaris: string;
  alamatKantorNotaris: string;
  isPenegakHukum: boolean;
  namaKuasaHukum: string;
  dokumenKuasaHukum: string;
  nomerSuratKuasa: string;
  tanggalSuratKuasa: Date;
  namaKantorSuratKuasa: string;
  detailLaporan: string;
  suratPengaduan: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  recInsert: Date;
  recUpdate: Date;
  isVerified: boolean;
  tanggalVerifikasi: Date;
  catatanTolakVerifikasi: string;
}
