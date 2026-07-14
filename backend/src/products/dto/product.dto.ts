import { IsString, IsBoolean, IsOptional, IsNumber, IsEnum, IsArray, MinLength, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export enum PurityDto {
  KARAT_24 = 'KARAT_24',
  KARAT_22 = 'KARAT_22',
  KARAT_18 = 'KARAT_18',
  KARAT_14 = 'KARAT_14',
}

export class ImageMetaDto {
  url: string;
  publicId?: string;
  width?: number;
  height?: number;
  order?: number;
  isFeatured?: boolean;
}

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  categoryId: string;

  @IsEnum(PurityDto)
  purity: PurityDto;

  @IsString()
  weight: string;

  @IsNumber()
  @Type(() => Number)
  weightGrams: number;

  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceValue?: number;

  @IsString()
  @MinLength(10)
  description: string;

  @IsOptional()
  @IsString()
  makingStyle?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isNewArrival?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isFeatured?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isAvailable?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isSoldOut?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isHidden?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  /** Populated by controller after Cloudinary upload */
  imagesMeta?: ImageMetaDto[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class ReorderImagesDto {
  @IsArray()
  @IsString({ each: true })
  imageIds: string[];
}

export class ProductQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() purity?: string;
  @IsOptional() @IsString() sortBy?: string;
  @IsOptional() @IsString() order?: 'asc' | 'desc';
  @IsOptional() @Type(() => Number) @IsNumber() page?: number = 1;
  @IsOptional() @Type(() => Number) @IsNumber() limit?: number = 10;
  @IsOptional() @IsBoolean() @Transform(({ value }) => value === 'true') featured?: boolean;
  @IsOptional() @IsBoolean() @Transform(({ value }) => value === 'true') available?: boolean;
  @IsOptional() @IsBoolean() @Transform(({ value }) => value === 'true') newArrival?: boolean;
}
