import { IsString, IsEnum, IsOptional, MinLength, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export enum OfferStatusDto { ACTIVE = 'ACTIVE', SCHEDULED = 'SCHEDULED', EXPIRED = 'EXPIRED' }

export class CreateOfferDto {
  @IsString() @MinLength(3) title: string;
  @IsString() description: string;
  @IsOptional() @IsEnum(OfferStatusDto) status?: OfferStatusDto;
  @IsDateString() startDate: string;
  @IsDateString() endDate: string;
}

export class UpdateOfferDto extends PartialType(CreateOfferDto) {}
