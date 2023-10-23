import { Status } from '@prisma/client';
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
  IsOptional,
} from 'class-validator';
import { AgamaState } from 'src/config/enum/agama.enum';
import { KelaminState } from 'src/config/enum/kelamin.enum';
// import { StatusLaporanState } from 'src/config/enum/status-laporan.enum';

export class CreatePengaduanMasyarakatDto {
  @IsUUID()
  @IsNotEmpty()
  // @IdIsExist({ message: 'Id already registered' })
  id: string;

  @IsNotEmpty()
  @IsEnum(KelaminState)
  jenisKelamin: KelaminState;

  @IsNotEmpty()
  alamatPelapor: string;

  @IsNotEmpty()
  alamatKantorSuratKuasa: string;

  @IsNotEmpty()
  jenisPerkara: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  namaPelapor: string;

  @IsNotEmpty()
  @IsDateString()
  tanggalLahir: Date;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  tempatLahir: string;

  @IsEnum(AgamaState)
  agama: AgamaState;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  pekerjaan: string;

  @IsNotEmpty()
  @IsString()
  @Length(15, 16)
  nik: string;

  @IsNotEmpty()
  @IsString()
  nikFiles: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{1,13}$/)
  noHandphone: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  notarisId: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  namaNotaris: string;

  @IsNotEmpty()
  @IsString()
  wilayahNotaris: string;

  @IsNotEmpty()
  @IsString()
  alamatKantorNotaris: string;

  @IsNotEmpty()
  @IsBoolean()
  isPenegakHukum: boolean;

  @IsNotEmpty()
  @Length(1, 100)
  namaKuasaHukum: string;

  @IsNotEmpty()
  @IsString()
  dokumenKuasaHukum: string;

  @IsNotEmpty()
  @IsString()
  nomerSuratKuasa: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  tanggalSuratKuasa: Date;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  namaKantorSuratKuasa: string;

  @IsNotEmpty()
  @IsString()
  detailLaporan: string;

  @IsNotEmpty()
  @IsString()
  suratPengaduan: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  recInsert: Date;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  recUpdate: Date;

  @IsNotEmpty()
  @IsBoolean()
  isVerified: boolean;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  tanggalVerifikasi: Date;

  @IsNotEmpty()
  @IsString()
  catatanTolakVerifikasi: string;
}
