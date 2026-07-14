import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestimonialDto, UpdateTestimonialDto } from './dto/testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  findAll(onlyApproved = false) {
    return this.prisma.testimonial.findMany({ where: onlyApproved ? { isApproved: true } : {}, orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const t = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!t) throw new NotFoundException('Testimonial not found');
    return t;
  }

  create(dto: CreateTestimonialDto) { return this.prisma.testimonial.create({ data: { ...dto, rating: dto.rating ?? 5 } }); }

  async update(id: string, dto: UpdateTestimonialDto) {
    await this.findOne(id);
    return this.prisma.testimonial.update({ where: { id }, data: dto });
  }

  async toggleApproved(id: string) {
    const t = await this.findOne(id);
    return this.prisma.testimonial.update({ where: { id }, data: { isApproved: !t.isApproved } });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.testimonial.delete({ where: { id } });
    return { message: 'Testimonial deleted' };
  }
}
