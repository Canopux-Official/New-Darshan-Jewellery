import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService, private activityLog: ActivityLogService) {}

  async getStats() {
    const [
      totalProducts, totalCategories, featuredProducts,
      galleryImages, testimonials, pendingTestimonials,
      currentRate,
    ] = await Promise.all([
      this.prisma.product.count({ where: { isHidden: false } }),
      this.prisma.category.count({ where: { isActive: true } }),
      this.prisma.product.count({ where: { isFeatured: true, isHidden: false } }),
      this.prisma.galleryImage.count(),
      this.prisma.testimonial.count({ where: { isApproved: true } }),
      this.prisma.testimonial.count({ where: { isApproved: false } }),
      this.prisma.goldRate.findFirst({ orderBy: { updatedAt: 'desc' } }),
    ]);

    return {
      totalProducts,
      totalCategories,
      featuredProducts,
      galleryImages,
      testimonials: { approved: testimonials, pending: pendingTestimonials },
      currentRate: currentRate ? {
        gold24k: `₹${currentRate.gold24k}`,
        gold22k: `₹${currentRate.gold22k}`,
        gold18k: `₹${currentRate.gold18k}`,
        silver: `₹${currentRate.silver}`,
        lastUpdated: currentRate.updatedAt,
      } : null,
    };
  }

  async getRecentProducts(limit = 7) {
    const products = await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        images: { orderBy: { order: 'asc' }, take: 1 },
        category: { select: { name: true, slug: true } },
      },
    });
    return products.map((p) => ({
      id: p.id, slug: p.slug, name: p.name, category: p.category.name,
      purity: p.purity, weight: p.weight, price: p.price,
      image: p.images[0]?.url || null,
      isHidden: p.isHidden, isFeatured: p.isFeatured, isAvailable: p.isAvailable,
      createdAt: p.createdAt,
    }));
  }

  async getRecentActivity(limit = 8) {
    return this.activityLog.getRecent(limit);
  }
}
