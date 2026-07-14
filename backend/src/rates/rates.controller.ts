import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { RatesService } from './rates.service';
import { UpdateRatesDto } from './dto/rate.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/user.decorator';

@Controller('rates')
@UseGuards(JwtAuthGuard)
export class RatesController {
  constructor(private ratesService: RatesService) {}

  @Public()
  @Get()
  getCurrent() { return this.ratesService.getCurrent(); }

  @Put()
  update(@Body() dto: UpdateRatesDto, @CurrentUser('id') userId: string) {
    return this.ratesService.update(dto, userId);
  }
}
