import {
  Controller, Get, Post, Put, Patch, Delete,
  Body, Param, Query, UseGuards, UseInterceptors, UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ProductQueryDto, ReorderImagesDto } from './dto/product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/user.decorator';
import { CloudinaryService } from '../uploads/cloudinary.service';
import { cloudinaryMulterOptions } from '../uploads/uploads.module';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private cloudinary: CloudinaryService,
  ) {}

  @Public()
  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get('admin')
  findAllAdmin(@Query() query: ProductQueryDto) {
    return this.productsService.findAllAdmin(query);
  }

  @Public()
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, cloudinaryMulterOptions))
  async create(
    @Body() dto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser('id') userId: string,
  ) {
    const uploads = files?.length ? await this.cloudinary.uploadMany(files, 'products') : [];
    const imagesMeta = uploads.map((u, i) => ({
      url: u.secureUrl,
      publicId: u.publicId,
      width: u.width,
      height: u.height,
      order: i,
      isFeatured: i === 0,
    }));
    return this.productsService.create({ ...dto, imagesMeta }, userId);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('images', 10, cloudinaryMulterOptions))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser('id') userId: string,
  ) {
    let imagesMeta;
    if (files?.length) {
      const uploads = await this.cloudinary.uploadMany(files, 'products');
      imagesMeta = uploads.map((u) => ({
        url: u.secureUrl,
        publicId: u.publicId,
        width: u.width,
        height: u.height,
      }));
    }
    return this.productsService.update(id, { ...dto, ...(imagesMeta && { imagesMeta }) }, userId);
  }

  @Post(':id/images')
  @UseInterceptors(FilesInterceptor('images', 10, cloudinaryMulterOptions))
  async addImages(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser('id') userId: string,
  ) {
    const uploads = await this.cloudinary.uploadMany(files || [], 'products');
    const imagesMeta = uploads.map((u) => ({
      url: u.secureUrl,
      publicId: u.publicId,
      width: u.width,
      height: u.height,
    }));
    return this.productsService.addImages(id, imagesMeta, userId);
  }

  @Delete(':id/images/:imageId')
  deleteImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.productsService.deleteImage(id, imageId, userId);
  }

  @Patch(':id/images/reorder')
  reorderImages(
    @Param('id') id: string,
    @Body() dto: ReorderImagesDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.productsService.reorderImages(id, dto.imageIds, userId);
  }

  @Patch(':id/images/:imageId/featured')
  setFeaturedImage(@Param('id') id: string, @Param('imageId') imageId: string) {
    return this.productsService.setFeaturedImage(id, imageId);
  }

  @Patch(':id/toggle-hidden')
  toggleHidden(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.productsService.toggleHidden(id, userId);
  }

  @Patch(':id/toggle-featured')
  toggleFeatured(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.productsService.toggleFeatured(id, userId);
  }

  @Patch(':id/toggle-sold-out')
  toggleSoldOut(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.productsService.toggleSoldOut(id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.productsService.remove(id, userId);
  }
}
