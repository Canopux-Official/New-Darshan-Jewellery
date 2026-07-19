import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto, UpdateOfferDto } from './dto/offer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { OfferStatus } from '@prisma/client';

@Controller('offers')
@UseGuards(JwtAuthGuard)
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Public()
  @Get()
  findAll(@Query('status') status?: string, @Query('public') isPublic?: string) {
    if (isPublic === 'true' || status?.toUpperCase() === 'ACTIVE') {
      return this.offersService.findPublicActive();
    }
    if (status && Object.values(OfferStatus).includes(status.toUpperCase() as OfferStatus)) {
      return this.offersService.findAll(status.toUpperCase() as OfferStatus);
    }
    return this.offersService.findAll();
  }

  @Get(':id') findOne(@Param('id') id: string) { return this.offersService.findOne(id); }
  @Post() create(@Body() dto: CreateOfferDto) { return this.offersService.create(dto); }
  @Put(':id') update(@Param('id') id: string, @Body() dto: UpdateOfferDto) { return this.offersService.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.offersService.remove(id); }
}
