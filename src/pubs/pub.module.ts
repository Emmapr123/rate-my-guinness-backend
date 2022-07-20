import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubService } from './pub.service';
import { PubController } from './pub.controller';
import { Pub } from './entities/pub.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pub])],
  controllers: [PubController],
  providers: [PubService],
})
export class PubModule { }
