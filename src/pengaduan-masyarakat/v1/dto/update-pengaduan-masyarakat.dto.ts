import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { AgamaState } from 'src/config/enum/agama.enum';

export class UpdatePengaduanMasyarakat {
  @IsNotEmpty()
  Id: string;

  JenisKelamin: string;
  AlamatPelapor: string;
  AlamatKantorSuratKuasa: string;
  JenisPerkara: string;
  UserId: string;
  NamaPelapor: string;
  TanggalLahir: Date;
  TempatLahir: string;

  @IsOptional()
  @IsEnum(AgamaState)
  Agama: AgamaState;

  Pekerjaan: string;
  NIK: string;
  NikFiles: string;
  NoHandphone: string;
  Email: string;
  NotarisId: string;
  NamaNotaris: string;
  WilayahNotaris: string;
  AlamatKantorNotaris: string;
  IsPenegakHukum: boolean;
  NamaKuasaHukum: string;
  DokumenKuasaHukum: string;
  NomerSuratKuasa: string;
  TanggalSuratKuasa: Date;
  NamaKantorSuratKuasa: string;
  DetailLaporan: string;
  SuratPengaduan: string;
  Status: string;
  RecInsert: Date;
  RecUpdate: Date;
  isVerified: boolean;
  TanggalVerifikasi: Date;
  CatatanTolakVerifikasi: string;

  createdAt: Date;
  updatedAt: Date;
}
