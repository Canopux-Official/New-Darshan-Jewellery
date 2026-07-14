import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';
import { ActivityLogModule } from '../activity-log/activity-log.module';

@Module({ imports: [ActivityLogModule], controllers: [RatesController], providers: [RatesService], exports: [RatesService] })
export class RatesModule {}
