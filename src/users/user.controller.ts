import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly PubsService: UserService) {}

  @Post()
  insertOne(@Body() createPubDto: CreateUserDto): Promise<User> {
    return this.PubsService.insertOne(createPubDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.PubsService.findAll();
  }

  @Get(':pubId')
  async findOne(@Param('pubId') pubId: string): Promise<User> {
    return this.PubsService.findOne(pubId);
  }

  @Patch(':pubId')
  async update(@Param('pubId') pubId: string, @Body() Pub: CreateUserDto) {
    return this.PubsService.update(pubId, Pub);
  }

  @Delete(':pubId')
  async delete(@Param('pubId') pubId: string): Promise<any> {
    return this.PubsService.remove(pubId);
  }
}
