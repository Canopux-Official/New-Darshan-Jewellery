import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ActivityLogModule } from '../activity-log/activity-log.module';

@Module({ imports: [ActivityLogModule], controllers: [DashboardController], providers: [DashboardService] })
export class DashboardModule {}
