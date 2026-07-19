import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOfferDto, UpdateOfferDto } from './dto/offer.dto';
import { OfferStatus } from '@prisma/client';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  findAll(status?: OfferStatus) {
    return this.prisma.offer.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  /** Active offers currently within their date window (for public site). */
  findPublicActive() {
    const now = new Date();
    return this.prisma.offer.findMany({
      where: {
        status: OfferStatus.ACTIVE,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const offer = await this.prisma.offer.findUnique({ where: { id } });
    if (!offer) throw new NotFoundException('Offer not found');
    return offer;
  }

  create(dto: CreateOfferDto) {
    return this.prisma.offer.create({
      data: {
        ...dto,
        status: (dto.status as OfferStatus) ?? OfferStatus.ACTIVE,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
  }

  async update(id: string, dto: UpdateOfferDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    if (dto.status) data.status = dto.status as OfferStatus;
    return this.prisma.offer.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.offer.delete({ where: { id } });
    return { message: 'Offer deleted' };
  }
}
