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
    return settings;
  }

  async update(dto: UpdateSettingsDto) {
    const current = await this.get();
    return this.prisma.storeSettings.update({
      where: { id: current.id },
      data: dto,
    });
  }
}
