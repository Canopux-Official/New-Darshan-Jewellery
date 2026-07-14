import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto, UpdateTestimonialDto } from './dto/testimonial.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@Controller('testimonials')
@UseGuards(JwtAuthGuard)
export class TestimonialsController {
  constructor(private testimonialsService: TestimonialsService) {}

  @Public() @Get() findAll(@Query('approved') approved?: string) {
    return this.testimonialsService.findAll(approved === 'true');
  }

  @Get(':id') findOne(@Param('id') id: string) { return this.testimonialsService.findOne(id); }
  @Post() create(@Body() dto: CreateTestimonialDto) { return this.testimonialsService.create(dto); }
  @Put(':id') update(@Param('id') id: string, @Body() dto: UpdateTestimonialDto) { return this.testimonialsService.update(id, dto); }
  @Patch(':id/toggle-approved') toggleApproved(@Param('id') id: string) { return this.testimonialsService.toggleApproved(id); }
  @Delete(':id') remove(@Param('id') id: string) { return this.testimonialsService.remove(id); }
}
