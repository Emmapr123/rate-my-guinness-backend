import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm/connection/Connection';

@Injectable()
export class HealthCheckService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  getHealth(): string {
    return `OK`;
  }
  checkDbConnection(): string {
    const isConnected = this.connection.isConnected;
    return isConnected.toString();
  }
}
