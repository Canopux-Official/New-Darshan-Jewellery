import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/settings.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  /** Return the singleton settings row, creating defaults if missing. */
  async get() {
    let settings = await this.prisma.storeSettings.findFirst();
    if (!settings) {
      settings = await this.prisma.storeSettings.create({ data: {} });
    }

    // Keep auth profile aligned with the Admin Name shown in Settings
    const admin = await this.prisma.adminUser.findFirst({ orderBy: { createdAt: 'asc' } });
    if (admin && settings.adminName && admin.name !== settings.adminName) {
      await this.prisma.adminUser.update({
        where: { id: admin.id },
        data: { name: settings.adminName },
      });
    }

    return settings;
  }

  async update(dto: UpdateSettingsDto) {
    const current = await this.get();
    const settings = await this.prisma.storeSettings.update({
      where: { id: current.id },
      data: dto,
    });

    // Keep logged-in admin profile (topbar name/initials) in sync with Settings
    if (dto.adminName !== undefined || dto.email !== undefined) {
      const admin = await this.prisma.adminUser.findFirst({ orderBy: { createdAt: 'asc' } });
      if (admin) {
        await this.prisma.adminUser.update({
          where: { id: admin.id },
          data: {
            ...(dto.adminName !== undefined ? { name: dto.adminName } : {}),
            ...(dto.email !== undefined ? { email: dto.email } : {}),
          },
        });
      }
    }

    return settings;
  }
}
