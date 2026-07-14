import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRatesDto {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  gold24k: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  gold22k: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  gold18k: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  silver: number;
}
