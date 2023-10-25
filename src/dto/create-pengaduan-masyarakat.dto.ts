import { Status } from '@prisma/client';
import { Transform, TransformFnParams } from 'class-transformer';
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
  NotContains,
  MaxDate,
} from 'class-validator';
// import { DateTime } from 'luxon';
import { AgamaState } from 'src/config/enum/agama.enum';
import { KelaminState } from 'src/config/enum/kelamin.enum';
// import { StatusLaporanState } from 'src/config/enum/status-laporan.enum';

const date = new Date();
date.setDate(date.getDate() + 1);

export class CreatePengaduanMasyarakatDto {
  @IsUUID()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  id: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEnum(KelaminState)
  jenisKelamin: KelaminState;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  alamatPelapor: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  alamatKantorSuratKuasa: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  jenisPerkara: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 100)
  namaPelapor: string;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  tanggalLahir: Date;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 100)
  tempatLahir: string;

  @IsEnum(AgamaState)
  agama: AgamaState;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 100)
  pekerjaan: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(15, 16)
  nik: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  nikFiles: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Matches(/^\d{1,13}$/)
  noHandphone: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  notarisId: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 100)
  namaNotaris: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  wilayahNotaris: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  alamatKantorNotaris: string;

  @IsNotEmpty()
  @IsBoolean()
  isPenegakHukum: boolean;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 100)
  namaKuasaHukum: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  dokumenKuasaHukum: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @NotContains(' ', {
    message: 'Gabole ada whitespace',
  })
  nomerSuratKuasa: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @MaxDate(() => date, {
    message: () => `maximal allowed date for date of birth is ${new Date()}`,
  })
  tanggalSuratKuasa: Date;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(1, 100)
  namaKantorSuratKuasa: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  detailLaporan: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  suratPengaduan: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  recInsert: Date;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  recUpdate: Date;

  @IsNotEmpty()
  @IsBoolean()
  isVerified: boolean;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  tanggalVerifikasi: Date;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  catatanTolakVerifikasi: string;
}
