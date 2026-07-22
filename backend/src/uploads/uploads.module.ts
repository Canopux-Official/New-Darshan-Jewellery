import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { memoryStorage } from 'multer';

const IMAGE_MIME = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const VIDEO_MIME = ['video/mp4', 'video/webm', 'video/quicktime'];

/** Shared Multer config for product/banner images */
export const cloudinaryMulterOptions = {
  storage: memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
  fileFilter: (_req: any, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    if (IMAGE_MIME.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Invalid file type: ${file.mimetype}`), false);
  },
};

/** Gallery Multer: images + videos (larger limit) */
export const galleryMulterOptions = {
  storage: memoryStorage(),
  limits: { fileSize: 80 * 1024 * 1024 }, // 80 MB for videos
  fileFilter: (_req: any, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    if (IMAGE_MIME.includes(file.mimetype) || VIDEO_MIME.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Invalid file type: ${file.mimetype}. Use images or MP4/WebM/MOV video.`), false);
  },
};

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class UploadsModule {}
