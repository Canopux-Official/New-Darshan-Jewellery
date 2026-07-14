import { IsString, IsBoolean, IsOptional, IsNumber, Min, Max, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateTestimonialDto {
  @IsString() @MinLength(2) name: string;
  @IsString() city: string;
  @IsString() @MinLength(10) quote: string;
  @IsOptional() @IsNumber() @Min(1) @Max(5) @Type(() => Number) rating?: number;
  @IsOptional() @IsBoolean() isApproved?: boolean;
}

export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {}
