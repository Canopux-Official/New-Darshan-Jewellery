import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { CloudinaryService } from '../uploads/cloudinary.service';

export type GalleryMediaInput = {
  url: string;
  publicId?: string;
  alt?: string;
  width?: number;
  height?: number;
  mediaType?: 'image' | 'video';
  format?: string;
  duration?: number;
  thumbnailUrl?: string;
};

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
    if (!img) throw new NotFoundException('Gallery item not found');
    return img;
  }

  async createMany(items: GalleryMediaInput[], userId?: string) {
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
            mediaType: f.mediaType || 'image',
            format: f.format,
            duration: f.duration,
            thumbnailUrl: f.thumbnailUrl,
            order: count + i,
          },
        }),
      ),
    );
    const videos = items.filter((i) => i.mediaType === 'video').length;
    const imgs = items.length - videos;
    const label =
      videos && imgs
        ? `${imgs} image(s) and ${videos} video(s) uploaded`
        : videos
          ? `${videos} gallery video(s) uploaded`
          : `${items.length} gallery image(s) uploaded`;
    await this.activityLog.log('gallery', 'Media Uploaded', label, userId);
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
    if (img.publicId) {
      const resourceType = img.mediaType === 'video' ? 'video' : 'image';
      await this.cloudinary.deleteByPublicId(img.publicId, resourceType);
    }
    await this.prisma.galleryImage.delete({ where: { id } });
    await this.activityLog.log(
      'gallery',
      'Media Deleted',
      img.mediaType === 'video' ? 'Gallery video removed' : 'Gallery image removed',
      userId,
    );
    return { message: 'Deleted' };
  }
}
