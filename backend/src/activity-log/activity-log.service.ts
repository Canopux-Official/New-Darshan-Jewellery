import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type ActivityType = 'product' | 'category' | 'rate' | 'gallery' | 'testimonial' | 'offer' | 'banner';

@Injectable()
export class ActivityLogService {
  constructor(private prisma: PrismaService) {}

  async log(type: ActivityType, action: string, detail: string, userId?: string) {
    return this.prisma.activityLog.create({ data: { type, action, detail, userId } });
  }

  async getRecent(limit = 10) {
    return this.prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { user: { select: { name: true } } },
    });
  }
}
