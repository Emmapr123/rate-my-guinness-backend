import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePubDto } from './dto/create-pub.dto';
import { Pub } from './entities/pub.entity';
import { PubService } from './pub.service';

const firstPub: CreatePubDto = {
  pubId: '1',
  name: 'this is a Pub',
};
const secondPub: CreatePubDto = {
  pubId: '2',
  name: 'this is also a Pub',
};
const arrayOfPubs: CreatePubDto[] = [
  firstPub,
  secondPub,
];
const updatedPub: CreatePubDto = {
  pubId: '1',
  name: 'an Updated Pub',
};

describe('PubService', () => {
  let service: PubService;
  let mockedRepository: Repository<Pub>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PubService,
        {
          provide: getRepositoryToken(Pub),
          useValue: {
            create: jest.fn().mockResolvedValue(firstPub),
            save: jest.fn().mockResolvedValue(firstPub),
            find: jest.fn().mockResolvedValue(arrayOfPubs),
            findOne: jest.fn().mockResolvedValue(secondPub),
            delete: jest.fn(),
            update: jest.fn().mockResolvedValue(updatedPub),
          },
        },
      ],
    }).compile();

    service = module.get<PubService>(PubService);
    mockedRepository = module.get<Repository<Pub>>(
      getRepositoryToken(Pub),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should succesfully create a Pub', async () => {
      const result = await service.insertOne(firstPub);
      expect(mockedRepository.create).toBeCalledTimes(1);
      expect(mockedRepository.create).toBeCalledWith(firstPub);
      expect(mockedRepository.save).toBeCalledTimes(1);
      expect(result).toEqual(firstPub);
    });
  });

  describe('find', () => {
    it('should return all Pubs', async () => {
      const result = await service.findAll();
      expect(result).toEqual(arrayOfPubs);
    });
  });

  describe('findOne', () => {
    it('should return only one account', async () => {
      const result = await service.findOne('2');
      expect(result).toEqual(secondPub);
      expect(mockedRepository.findOne).toBeCalledWith({
        where: { pubId: '2' },
      });
    });
  });

  describe('update', () => {
    it('should update a Pub', async () => {
      const result = await service.update('1', updatedPub);
      expect(result).toEqual(updatedPub);
      expect(mockedRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should remove a Pub', async () => {
      const result = await service.remove('1');
      expect(result).toEqual(undefined);
      expect(mockedRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
