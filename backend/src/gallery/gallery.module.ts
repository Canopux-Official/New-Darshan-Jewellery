import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [ActivityLogModule, UploadsModule],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
