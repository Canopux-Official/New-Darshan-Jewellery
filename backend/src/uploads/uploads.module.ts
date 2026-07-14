import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { memoryStorage } from 'multer';

/** Shared Multer config: memory storage so buffers go straight to Cloudinary */
export const cloudinaryMulterOptions = {
  storage: memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
  fileFilter: (_req: any, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Invalid file type: ${file.mimetype}`), false);
  },
};

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class UploadsModule {}
