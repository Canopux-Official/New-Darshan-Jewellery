import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService, private activityLog: ActivityLogService) {}

  async findAll(activeOnly = false) {
    const categories = await this.prisma.category.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: { name: 'asc' },
      include: { _count: { select: { products: true } } },
    });
    return categories.map((c) => ({ ...c, productCount: c._count.products }));
  }

  async findOne(id: string) {
    const cat = await this.prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });
    if (!cat) throw new NotFoundException('Category not found');
    return { ...cat, productCount: cat._count.products };
  }

  async create(dto: CreateCategoryDto, userId?: string) {
    const slug = dto.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const exists = await this.prisma.category.findUnique({ where: { slug } });
    if (exists) throw new ConflictException('A category with this name already exists');
    const category = await this.prisma.category.create({ data: { name: dto.name, slug, isActive: dto.isActive ?? true } });
    await this.activityLog.log('category', 'Category created', `"${category.name}" added`, userId);
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto, userId?: string) {
    await this.findOne(id);
    const category = await this.prisma.category.update({ where: { id }, data: dto });
    await this.activityLog.log('category', 'Category updated', `"${category.name}" updated`, userId);
    return category;
  }

  async remove(id: string, userId?: string) {
    const cat = await this.findOne(id);
    await this.prisma.category.delete({ where: { id } });
    await this.activityLog.log('category', 'Category deleted', `"${cat.name}" removed`, userId);
    return { message: 'Category deleted' };
  }
}
