import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { CloudinaryService } from '../uploads/cloudinary.service';

@Injectable()
export class GalleryService {
  constructor(
    private prisma: PrismaService,
    private activityLog: ActivityLogService,
    private cloudinary: CloudinaryService,
  ) {}

  findAll() {
    return this.prisma.galleryImage.findMany({ orderBy: { order: 'asc' } });
  }

  async findOne(id: string) {
    const img = await this.prisma.galleryImage.findUnique({ where: { id } });
    if (!img) throw new NotFoundException('Gallery image not found');
    return img;
  }

  async createMany(
    items: { url: string; publicId?: string; alt?: string; width?: number; height?: number }[],
    userId?: string,
  ) {
    const count = await this.prisma.galleryImage.count();
    const images = await this.prisma.$transaction(
      items.map((f, i) =>
        this.prisma.galleryImage.create({
          data: {
            url: f.url,
            publicId: f.publicId,
            alt: f.alt,
            width: f.width,
            height: f.height,
            order: count + i,
          },
        }),
      ),
    );
    await this.activityLog.log('gallery', 'Image Uploaded', `${items.length} gallery image(s) uploaded`, userId);
    return images;
  }

  async reorder(ids: string[], userId?: string) {
    await this.prisma.$transaction(
      ids.map((id, order) => this.prisma.galleryImage.update({ where: { id }, data: { order } })),
    );
    await this.activityLog.log('gallery', 'Gallery Reordered', 'Gallery order updated', userId);
    return this.findAll();
  }

  async remove(id: string, userId?: string) {
    const img = await this.findOne(id);
    if (img.publicId) await this.cloudinary.deleteByPublicId(img.publicId);
    await this.prisma.galleryImage.delete({ where: { id } });
    await this.activityLog.log('gallery', 'Image Deleted', 'Gallery image removed', userId);
    return { message: 'Image deleted' };
  }
}
