import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreatePubDto } from './dto/create-pub.dto';
import { Pub } from './entities/pub.entity';
import { PubService } from './pub.service';

@Controller('api/v1/relaxed-constraints')
export class PubController {
    constructor(
        private readonly PubsService: PubService,
    ) { }

    @Post()
    insertOne(
        @Body() createPubDto: CreatePubDto,
    ): Promise<Pub> {
        return this.PubsService.insertOne(createPubDto);
    }

    @Get()
    findAll(): Promise<Pub[]> {
        return this.PubsService.findAll();
    }

    @Get(':constraintId')
    async findOne(
        @Param('constraintId') constraintId: string,
    ): Promise<Pub> {
        return this.PubsService.findOne(constraintId);
    }

    @Patch(':constraintId')
    async update(
        @Param('constraintId') constraintId: string,
        @Body() Pub: CreatePubDto,
    ) {
        return this.PubsService.update(
            constraintId,
            Pub,
        );
    }

    @Delete(':constraintId')
    async delete(@Param('constraintId') constraintId: string): Promise<any> {
        return this.PubsService.remove(constraintId);
    }
}
