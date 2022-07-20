import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePubDto } from './dto/create-pub.dto';
import { Pub } from './entities/pub.entity';

@Injectable()
export class PubService {
  constructor(
    @InjectRepository(Pub)
    private pubRepository: Repository<Pub>,
  ) {}

  async insertOne(pub: CreatePubDto): Promise<any> {
    const newPub = this.pubRepository.create(pub);
    return this.pubRepository.save(newPub);
  }

  findAll(): Promise<Pub[]> {
    return this.pubRepository.find();
  }

  findOne(pubId: string): Promise<Pub> {
    const pub = this.pubRepository.findOne({
      where: { pubId: pubId },
    });
    return pub;
  }

  update(pubId: string, pub: CreatePubDto): Promise<UpdateResult> {
    return this.pubRepository.update(pubId, pub);
  }

  remove(pubId: string): Promise<DeleteResult> {
    return this.pubRepository.delete(pubId);
  }
}
