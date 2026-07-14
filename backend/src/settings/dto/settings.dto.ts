import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional() @IsString() storeName?: string;
  @IsOptional() @IsString() adminName?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() whatsapp?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() weekdayHours?: string;
  @IsOptional() @IsString() sundayHours?: string;
  @IsOptional() @IsString() instagramUrl?: string;
  @IsOptional() @IsString() facebookUrl?: string;
  @IsOptional() @IsString() googleMapsUrl?: string;
}
