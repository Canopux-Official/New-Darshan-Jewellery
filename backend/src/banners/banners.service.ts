import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBannerDto, UpdateBannerDto } from './dto/banner.dto';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { CloudinaryService } from '../uploads/cloudinary.service';

@Injectable()
export class BannersService {
  constructor(
    private prisma: PrismaService,
    private activityLog: ActivityLogService,
    private cloudinary: CloudinaryService,
  ) {}

  findAll(activeOnly = false) {
    return this.prisma.heroBanner.findMany({
      where: activeOnly ? { isActive: true } : {},
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const banner = await this.prisma.heroBanner.findUnique({ where: { id } });
    if (!banner) throw new NotFoundException('Banner not found');
    return banner;
  }

  async create(dto: CreateBannerDto & { publicId?: string }, userId?: string) {
    const count = await this.prisma.heroBanner.count();
    const banner = await this.prisma.heroBanner.create({
      data: {
        title: dto.title,
        subtitle: dto.subtitle,
        imageUrl: dto.imageUrl || '',
        publicId: dto.publicId,
        isActive: dto.isActive ?? true,
        order: dto.order ?? count + 1,
      },
    });
    await this.activityLog.log('banner', 'Banner Changed', `"${banner.title}" uploaded`, userId);
    return banner;
  }

  async update(id: string, dto: UpdateBannerDto & { publicId?: string }, userId?: string) {
    const existing = await this.findOne(id);
    // If replacing image, delete old Cloudinary asset
    if (dto.publicId && existing.publicId && dto.publicId !== existing.publicId) {
      await this.cloudinary.deleteByPublicId(existing.publicId);
    }
    const banner = await this.prisma.heroBanner.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.subtitle !== undefined && { subtitle: dto.subtitle }),
        ...(dto.imageUrl !== undefined && { imageUrl: dto.imageUrl }),
        ...(dto.publicId !== undefined && { publicId: dto.publicId }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        ...(dto.order !== undefined && { order: dto.order }),
      },
    });
    await this.activityLog.log('banner', 'Banner Changed', `"${banner.title}" updated`, userId);
    return banner;
  }

  async reorder(ids: string[], userId?: string) {
    await this.prisma.$transaction(
      ids.map((id, order) => this.prisma.heroBanner.update({ where: { id }, data: { order } })),
    );
    await this.activityLog.log('banner', 'Banner Changed', 'Banner order updated', userId);
    return this.findAll();
  }

  async remove(id: string, userId?: string) {
    const banner = await this.findOne(id);
    if (banner.publicId) await this.cloudinary.deleteByPublicId(banner.publicId);
    await this.prisma.heroBanner.delete({ where: { id } });
    await this.activityLog.log('banner', 'Banner Changed', `"${banner.title}" removed`, userId);
    return { message: 'Banner deleted' };
  }
}
