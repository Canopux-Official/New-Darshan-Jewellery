import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

export interface CloudinaryUploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export type CloudinaryFolder = 'products' | 'banners' | 'gallery';

const ALLOWED_MIME = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);
  private readonly baseFolder: string;
  private configured = false;

  constructor(private config: ConfigService) {
    const cloudName = (this.config.get<string>('CLOUDINARY_CLOUD_NAME') || '').trim();
    const apiKey = (this.config.get<string>('CLOUDINARY_API_KEY') || '').trim();
    const apiSecret = (this.config.get<string>('CLOUDINARY_API_SECRET') || '').trim();
    this.baseFolder = this.config.get<string>('CLOUDINARY_FOLDER') || 'new-darshan-jewellery';

    if (cloudName && apiKey && apiSecret) {
      cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
      this.configured = true;
      this.logger.log(`Cloudinary configured for cloud: ${cloudName}`);
    } else {
      this.logger.warn('Cloudinary credentials missing — uploads will fail until configured.');
    }
  }

  assertConfigured() {
    if (!this.configured) {
      throw new BadRequestException(
        'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env',
      );
    }
  }

  validateFile(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');
    if (!ALLOWED_MIME.has(file.mimetype)) {
      throw new BadRequestException(`Invalid file type "${file.mimetype}". Allowed: JPEG, PNG, WebP, GIF, AVIF`);
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException(`File exceeds maximum size of ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
    }
  }

  async uploadBuffer(file: Express.Multer.File, folder: CloudinaryFolder): Promise<CloudinaryUploadResult> {
    this.assertConfigured();
    this.validateFile(file);

    const folderPath = `${this.baseFolder}/${folder}`;

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folderPath,
          resource_type: 'image',
          overwrite: false,
          // Store originals; optimize on delivery via URL transforms
          quality: 'auto:good',
          fetch_format: 'auto',
        },
        (error, result: UploadApiResponse) => {
          if (error || !result) {
            this.logger.error(`Cloudinary upload failed: ${error?.message}`);
            return reject(new BadRequestException(error?.message || 'Image upload failed'));
          }
          resolve({
            url: result.secure_url,
            secureUrl: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        },
      );

      Readable.from(file.buffer).pipe(stream);
    });
  }

  async uploadMany(files: Express.Multer.File[], folder: CloudinaryFolder): Promise<CloudinaryUploadResult[]> {
    const results: CloudinaryUploadResult[] = [];
    for (const file of files) {
      results.push(await this.uploadBuffer(file, folder));
    }
    return results;
  }

  async deleteByPublicId(publicId: string): Promise<void> {
    if (!publicId || !this.configured) return;
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    } catch (err) {
      this.logger.warn(`Failed to delete Cloudinary asset ${publicId}: ${(err as Error).message}`);
    }
  }

  /** Build an optimized delivery URL with optional transforms (frontend can also do this). */
  optimizeUrl(urlOrPublicId: string, opts: { width?: number; height?: number; quality?: string } = {}): string {
    if (!this.configured) return urlOrPublicId;
    const { width, height, quality = 'auto' } = opts;

    // If it's already a full Cloudinary URL with transforms, return as-is for now
    if (urlOrPublicId.startsWith('http') && !urlOrPublicId.includes('res.cloudinary.com')) {
      return urlOrPublicId;
    }

    const publicId = urlOrPublicId.includes('res.cloudinary.com')
      ? this.extractPublicId(urlOrPublicId)
      : urlOrPublicId;

    if (!publicId) return urlOrPublicId;

    const transforms: string[] = ['f_auto', `q_${quality}`];
    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`, 'c_fill');

    return cloudinary.url(publicId, {
      secure: true,
      transformation: [{ fetch_format: 'auto', quality, ...(width && { width }), ...(height && { height, crop: 'fill' }) }],
    });
  }

  private extractPublicId(url: string): string | null {
    // e.g. https://res.cloudinary.com/demo/image/upload/v123/folder/name.jpg
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
    return match ? match[1] : null;
  }
}
