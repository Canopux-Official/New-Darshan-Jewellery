import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BannersService } from './banners.service';
import { CreateBannerDto, UpdateBannerDto } from './dto/banner.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/user.decorator';
import { CloudinaryService } from '../uploads/cloudinary.service';
import { cloudinaryMulterOptions } from '../uploads/uploads.module';
import { IsArray, IsString } from 'class-validator';

class ReorderDto {
  @IsArray() @IsString({ each: true }) ids: string[];
}

@Controller('banners')
@UseGuards(JwtAuthGuard)
export class BannersController {
  constructor(private bannersService: BannersService, private cloudinary: CloudinaryService) {}

  @Public()
  @Get()
  findAll(@Query('active') active?: string) {
    return this.bannersService.findAll(active === 'true');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannersService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', cloudinaryMulterOptions))
  async create(
    @Body() dto: CreateBannerDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('id') userId: string,
  ) {
    let imageUrl = dto.imageUrl || '';
    let publicId: string | undefined;
    if (file) {
      const uploaded = await this.cloudinary.uploadBuffer(file, 'banners');
      imageUrl = uploaded.secureUrl;
      publicId = uploaded.publicId;
    }
    return this.bannersService.create({ ...dto, imageUrl, publicId }, userId);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', cloudinaryMulterOptions))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBannerDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('id') userId: string,
  ) {
    let extra: { imageUrl?: string; publicId?: string } = {};
    if (file) {
      const uploaded = await this.cloudinary.uploadBuffer(file, 'banners');
      extra = { imageUrl: uploaded.secureUrl, publicId: uploaded.publicId };
    }
    return this.bannersService.update(id, { ...dto, ...extra }, userId);
  }

  @Patch('reorder')
  reorder(@Body() dto: ReorderDto, @CurrentUser('id') userId: string) {
    return this.bannersService.reorder(dto.ids, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.bannersService.remove(id, userId);
  }
}
