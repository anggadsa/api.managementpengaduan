import {
  IsNotEmpty,
  IsString,
  Length,
  IsDateString,
  IsEnum,
  Matches,
  IsBoolean,
  IsUUID,
  IsEmail,
} from 'class-validator';
import { AgamaState } from 'src/config/enum/agama.enum';
import { KelaminState } from 'src/config/enum/kelamin.enum';
import { StatusLaporanState } from 'src/config/enum/status-laporan.enum';
// import { IdIsExist } from './validation-rules/id-not-registered.rule';

export class CreatePengaduanMasyarakatDto {
  @IsUUID()
  @IsNotEmpty()
  // @IdIsExist({ message: 'Id already registered' })
  Id: string;

  @IsNotEmpty()
  @IsEnum(KelaminState)
  JenisKelamin: KelaminState;

  @IsNotEmpty()
  AlamatPelapor: string;

  @IsNotEmpty()
  AlamatKantorSuratKuasa: string;

  @IsNotEmpty()
  JenisPerkara: string;

  @IsNotEmpty()
  @IsString()
  UserId: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  NamaPelapor: string;

  @IsNotEmpty()
  @IsDateString()
  TanggalLahir: Date;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  TempatLahir: string;

  @IsEnum(AgamaState)
  Agama: AgamaState;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  Pekerjaan: string;

  @IsNotEmpty()
  @IsString()
  @Length(15, 16)
  NIK: string;

  @IsNotEmpty()
  @IsString()
  NikFiles: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{1,13}$/)
  NoHandphone: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  @IsString()
  NotarisId: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  NamaNotaris: string;

  @IsNotEmpty()
  @IsString()
  WilayahNotaris: string;

  @IsNotEmpty()
  @IsString()
  AlamatKantorNotaris: string;

  @IsNotEmpty()
  @IsBoolean()
  IsPenegakHukum: boolean;

  @IsNotEmpty()
  @Length(1, 100)
  NamaKuasaHukum: string;

  @IsNotEmpty()
  @IsString()
  DokumenKuasaHukum: string;

  @IsNotEmpty()
  @IsString()
  NomerSuratKuasa: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  TanggalSuratKuasa: Date;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  NamaKantorSuratKuasa: string;

  @IsNotEmpty()
  @IsString()
  DetailLaporan: string;

  @IsNotEmpty()
  @IsString()
  SuratPengaduan: string;

  @IsNotEmpty()
  @IsEnum(StatusLaporanState)
  Status: StatusLaporanState;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  RecInsert: Date;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  RecUpdate: Date;

  @IsNotEmpty()
  @IsBoolean()
  isVerified: boolean;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  TanggalVerifikasi: Date;

  @IsNotEmpty()
  @IsString()
  CatatanTolakVerifikasi: string;
}
