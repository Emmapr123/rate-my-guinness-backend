import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { PubModule } from './pubs/pub.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [HealthCheckModule, DatabaseModule, PubModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
