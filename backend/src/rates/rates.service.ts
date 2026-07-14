import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateRatesDto } from './dto/rate.dto';
import { ActivityLogService } from '../activity-log/activity-log.service';

/**
 * Rates provider abstraction.
 * Currently: manual admin updates (source = "manual").
 * Future Gold API: swap/update implementation without changing controllers or frontend.
 */
@Injectable()
export class RatesService {
  constructor(private prisma: PrismaService, private activityLog: ActivityLogService) {}

  async getCurrent() {
    const rate = await this.prisma.goldRate.findFirst({ orderBy: { updatedAt: 'desc' } });
    if (!rate) return { gold24k: 0, gold22k: 0, gold18k: 0, silver: 0, lastUpdated: null, source: 'manual' };
    return {
      id: rate.id,
      gold24k: rate.gold24k,
      gold22k: rate.gold22k,
      gold18k: rate.gold18k,
      silver: rate.silver,
      lastUpdated: rate.updatedAt,
      source: rate.source || 'manual',
    };
  }

  async update(dto: UpdateRatesDto, userId?: string) {
    const existing = await this.prisma.goldRate.findFirst({ orderBy: { updatedAt: 'desc' } });
    const data = { ...dto, source: 'manual' };
    const rate = existing
      ? await this.prisma.goldRate.update({ where: { id: existing.id }, data })
      : await this.prisma.goldRate.create({ data });

    await this.activityLog.log(
      'rate',
      'Rates Updated',
      `24K: ₹${dto.gold24k} · 22K: ₹${dto.gold22k} · 18K: ₹${dto.gold18k} · Silver: ₹${dto.silver}`,
      userId,
    );
    return {
      id: rate.id,
      gold24k: rate.gold24k,
      gold22k: rate.gold22k,
      gold18k: rate.gold18k,
      silver: rate.silver,
      lastUpdated: rate.updatedAt,
      source: rate.source,
    };
  }
}
