import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';

@Controller('internal/health-check')
export class HealthCheckController {
  constructor(private readonly service: HealthCheckService) {}

  @Get()
  getHealth(): string {
    return this.service.getHealth();
  }
  @Get(`/db`)
  checkDbConnection(): string {
    return this.service.checkDbConnection();
  }
}
