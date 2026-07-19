import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/user.decorator';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Public()
  @Get()
  findAllPublic() { return this.categoriesService.findAll(true); }

  @Get('admin/all')
  findAllAdmin() { return this.categoriesService.findAll(false); }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) { return this.categoriesService.findOne(id); }

  @Post()
  create(@Body() dto: CreateCategoryDto, @CurrentUser('id') userId: string) {
    return this.categoriesService.create(dto, userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto, @CurrentUser('id') userId: string) {
    return this.categoriesService.update(id, dto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.categoriesService.remove(id, userId);
  }
}
