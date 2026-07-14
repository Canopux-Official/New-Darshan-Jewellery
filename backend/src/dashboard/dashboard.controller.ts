import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('stats') getStats() { return this.dashboardService.getStats(); }
  @Get('recent-products') getRecentProducts() { return this.dashboardService.getRecentProducts(); }
  @Get('activity') getActivity() { return this.dashboardService.getRecentActivity(); }
}
