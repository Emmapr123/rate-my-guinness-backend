import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePubDto } from './dto/create-pub.dto';
import { UpdatePubDto } from './dto/update-pub.dto';
import { Pub } from './entities/pub.entity';
import { PubService } from './pub.service';

@Controller('api/v1/pub')
export class PubController {
  constructor(private readonly PubsService: PubService) {}

  @Post()
  insertOne(@Body() createPubDto: CreatePubDto): Promise<Pub> {
    return this.PubsService.insertOne(createPubDto);
  }

  @Get()
  async findAll(
    @Query('coordinates') coordinates?: string,
  ): Promise<Pub | Pub[]> {
    return coordinates
      ? this.PubsService.findOneByLocation(coordinates)
      : this.PubsService.findAll();
  }

  @Get(':pubId')
  async findOne(@Param('pubId') pubId: string): Promise<Pub> {
    return this.PubsService.findOne(pubId);
  }

  @Patch(':pubId')
  async update(@Param('pubId') pubId: string, @Body() Pub: UpdatePubDto) {
    return this.PubsService.update(pubId, Pub);
  }

  @Delete(':pubId')
  async delete(@Param('pubId') pubId: string): Promise<any> {
    return this.PubsService.remove(pubId);
  }
}
