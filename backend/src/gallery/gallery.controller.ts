import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GalleryService } from './gallery.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/user.decorator';
import { CloudinaryService } from '../uploads/cloudinary.service';
import { cloudinaryMulterOptions } from '../uploads/uploads.module';
import { IsArray, IsString } from 'class-validator';

class ReorderDto {
  @IsArray() @IsString({ each: true }) ids: string[];
}

@Controller('gallery')
@UseGuards(JwtAuthGuard)
export class GalleryController {
  constructor(private galleryService: GalleryService, private cloudinary: CloudinaryService) {}

  @Public()
  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('images', 20, cloudinaryMulterOptions))
  async uploadMany(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('alt') alt: string,
    @CurrentUser('id') userId: string,
  ) {
    const uploads = await this.cloudinary.uploadMany(files || [], 'gallery');
    const items = uploads.map((u) => ({
      url: u.secureUrl,
      publicId: u.publicId,
      alt: alt || undefined,
      width: u.width,
      height: u.height,
    }));
    return this.galleryService.createMany(items, userId);
  }

  @Patch('reorder')
  reorder(@Body() dto: ReorderDto, @CurrentUser('id') userId: string) {
    return this.galleryService.reorder(dto.ids, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.galleryService.remove(id, userId);
  }
}
