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
  resourceType: 'image' | 'video';
  duration?: number;
  thumbnailUrl?: string;
}

export type CloudinaryFolder = 'products' | 'banners' | 'gallery';

const IMAGE_MIME = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);
const VIDEO_MIME = new Set(['video/mp4', 'video/webm', 'video/quicktime']);
const MAX_IMAGE_SIZE = 8 * 1024 * 1024; // 8 MB
const MAX_VIDEO_SIZE = 80 * 1024 * 1024; // 80 MB

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

  isVideo(mime: string) {
    return VIDEO_MIME.has(mime) || mime.startsWith('video/');
  }

  isImage(mime: string) {
    return IMAGE_MIME.has(mime);
  }

  validateFile(file: Express.Multer.File, opts: { allowVideo?: boolean } = {}) {
    if (!file) throw new BadRequestException('No file provided');
    const allowVideo = opts.allowVideo === true;
    const okImage = this.isImage(file.mimetype);
    const okVideo = allowVideo && this.isVideo(file.mimetype);

    if (!okImage && !okVideo) {
      throw new BadRequestException(
        allowVideo
          ? `Invalid file type "${file.mimetype}". Allowed: JPEG, PNG, WebP, GIF, AVIF, MP4, WebM, MOV`
          : `Invalid file type "${file.mimetype}". Allowed: JPEG, PNG, WebP, GIF, AVIF`,
      );
    }

    const max = okVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > max) {
      throw new BadRequestException(`File exceeds maximum size of ${max / (1024 * 1024)}MB`);
    }
  }

  async uploadBuffer(
    file: Express.Multer.File,
    folder: CloudinaryFolder,
    opts: { allowVideo?: boolean } = {},
  ): Promise<CloudinaryUploadResult> {
    this.assertConfigured();
    this.validateFile(file, opts);

    const isVideo = this.isVideo(file.mimetype);
    const resourceType = isVideo ? 'video' : 'image';
    const folderPath = `${this.baseFolder}/${folder}`;

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folderPath,
          resource_type: resourceType,
          overwrite: false,
          ...(isVideo
            ? {}
            : { quality: 'auto:good', fetch_format: 'auto' }),
        },
        (error, result: UploadApiResponse) => {
          if (error || !result) {
            this.logger.error(`Cloudinary upload failed: ${error?.message}`);
            return reject(new BadRequestException(error?.message || 'Upload failed'));
          }

          let thumbnailUrl: string | undefined;
          if (isVideo) {
            // Skip the opening frame — many clips start black/faded
            thumbnailUrl = cloudinary.url(result.public_id, {
              resource_type: 'video',
              format: 'jpg',
              secure: true,
              transformation: [{ start_offset: '1', width: 800, crop: 'fill', quality: 'auto' }],
            });
          }

          resolve({
            url: result.secure_url,
            secureUrl: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
            resourceType,
            duration: typeof result.duration === 'number' ? result.duration : undefined,
            thumbnailUrl,
          });
        },
      );

      Readable.from(file.buffer).pipe(stream);
    });
  }

  async uploadMany(
    files: Express.Multer.File[],
    folder: CloudinaryFolder,
    opts: { allowVideo?: boolean } = {},
  ): Promise<CloudinaryUploadResult[]> {
    const results: CloudinaryUploadResult[] = [];
    for (const file of files) {
      results.push(await this.uploadBuffer(file, folder, opts));
    }
    return results;
  }

  async deleteByPublicId(publicId: string, resourceType: 'image' | 'video' = 'image'): Promise<void> {
    if (!publicId || !this.configured) return;
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    } catch (err) {
      this.logger.warn(`Failed to delete Cloudinary asset ${publicId}: ${(err as Error).message}`);
    }
  }

  /** Build an optimized delivery URL with optional transforms (frontend can also do this). */
  optimizeUrl(urlOrPublicId: string, opts: { width?: number; height?: number; quality?: string } = {}): string {
    if (!this.configured) return urlOrPublicId;
    const { width, height, quality = 'auto' } = opts;

    if (urlOrPublicId.startsWith('http') && !urlOrPublicId.includes('res.cloudinary.com')) {
      return urlOrPublicId;
    }

    const publicId = urlOrPublicId.includes('res.cloudinary.com')
      ? this.extractPublicId(urlOrPublicId)
      : urlOrPublicId;

    if (!publicId) return urlOrPublicId;

    return cloudinary.url(publicId, {
      secure: true,
      transformation: [{ fetch_format: 'auto', quality, ...(width && { width }), ...(height && { height, crop: 'fill' }) }],
    });
  }

  private extractPublicId(url: string): string | null {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
    return match ? match[1] : null;
  }
}
