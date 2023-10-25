import { Status } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { AgamaState } from 'src/config/enum/agama.enum';

export class UpdatePengaduanMasyarakat {
  readonly id: string;

  @IsOptional()
  jenisKelamin: string;

  @IsOptional()
  alamatPelapor: string;

  @IsOptional()
  alamatKantorSuratKuasa: string;

  @IsOptional()
  jenisPerkara: string;

  @IsOptional()
  userId: string;

  @IsOptional()
  namaPelapor: string;

  @IsOptional()
  tanggalLahir: Date;

  @IsOptional()
  tempatLahir: string;

  @IsOptional()
  @IsEnum(AgamaState)
  agama: AgamaState | string;

  @IsOptional()
  pekerjaan: string;

  @IsOptional()
  nik: string;

  @IsOptional()
  nikFiles: string;

  @IsOptional()
  noHandphone: string;

  @IsOptional()
  email: string;

  // @IsOptional()
  // notarisId: string;

  @IsOptional()
  namaNotaris: string;

  @IsOptional()
  wilayahNotaris: string;

  @IsOptional()
  alamatKantorNotaris: string;

  @IsOptional()
  isPenegakHukum: boolean;

  @IsOptional()
  namaKuasaHukum: string;

  @IsOptional()
  dokumenKuasaHukum: string;

  // @IsOptional()
  // nomerSuratKuasa: string;

  @IsOptional()
  tanggalSuratKuasa: Date;

  @IsOptional()
  namaKantorSuratKuasa: string;

  @IsOptional()
  detailLaporan: string;

  @IsOptional()
  suratPengaduan: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsOptional()
  recInsert: Date;

  @IsOptional()
  recUpdate: Date;

  @IsOptional()
  isVerified: boolean;

  @IsOptional()
  tanggalVerifikasi: Date;

  @IsOptional()
  catatanTolakVerifikasi: string;
}
