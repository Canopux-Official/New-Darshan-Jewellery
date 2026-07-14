import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [ActivityLogModule, UploadsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
