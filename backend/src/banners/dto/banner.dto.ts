import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type, Transform } from 'class-transformer';

export class CreateBannerDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  order?: number;

  imageUrl?: string; // set by controller after upload
}

export class UpdateBannerDto extends PartialType(CreateBannerDto) {}
