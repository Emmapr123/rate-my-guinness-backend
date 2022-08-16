import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { when } from 'jest-when';
import { Repository } from 'typeorm';
import { CreatePubDto } from './dto/create-pub.dto';
import { UpdatePubDto } from './dto/update-pub.dto';
import { Pub } from './entities/pub.entity';
import { PubService } from './pub.service';

const firstPub: CreatePubDto = {
  pubId: '1',
  name: 'this is a Pub',
  coordinates: '123, 123',
};
const secondPub: CreatePubDto = {
  pubId: '2',
  name: 'this is also a Pub',
  coordinates: '456, 456',
};
const arrayOfPubs: CreatePubDto[] = [firstPub, secondPub];
const updatedPub: UpdatePubDto = {
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
            findOne: jest.fn(),
            findOneByLocation: jest.fn(),
            delete: jest.fn(),
            update: jest.fn().mockResolvedValue(updatedPub),
            createQueryBuilder: jest.fn(() => ({
              where: jest.fn().mockReturnThis(),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<PubService>(PubService);
    mockedRepository = module.get<Repository<Pub>>(getRepositoryToken(Pub));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should succesfully create a Pub', async () => {
      service.findOneByLocation = jest.fn();
      when(service.findOneByLocation)
        .calledWith('123, 123')
        .mockReturnValue(undefined);
      const result = await service.insertOne(firstPub);
      expect(service.findOneByLocation).toBeCalledTimes(1);
      expect(mockedRepository.create).toBeCalledTimes(1);
      expect(mockedRepository.create).toBeCalledWith(firstPub);
      expect(mockedRepository.save).toBeCalledTimes(1);
      expect(result).toEqual(firstPub);
    });

    it('returns a pub if a pub already exists on this location', async () => {
      service.findOneByLocation = jest.fn();
      when(service.findOneByLocation).calledWith('456, 456').mockResolvedValue({
        pubId: '2',
        name: 'this is also a Pub',
        coordinates: '456, 456',
        rating: 5,
        reviewCount: 1,
        url: '',
      });
      const result = await service.insertOne(secondPub);
      expect(service.findOneByLocation).toBeCalledTimes(1);
      expect(mockedRepository.create).toBeCalledTimes(0);
      expect(mockedRepository.save).toBeCalledTimes(0);
      expect(result).toEqual({
        ...secondPub,
        rating: 5,
        reviewCount: 1,
        url: '',
      });
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
      service.findOne = jest.fn();
      when(service.findOne).calledWith('2').mockResolvedValue({
        pubId: '2',
        name: 'this is also a Pub',
        coordinates: '456, 456',
        rating: 5,
        reviewCount: 1,
        url: '',
      });
      const result = await service.findOne('2');
      expect(result).toEqual({
        ...secondPub,
        rating: 5,
        reviewCount: 1,
        url: '',
      });
    });
  });

  describe('findOneByLocation', () => {
    it('should return only one account', async () => {
      service.findOneByLocation = jest.fn();
      when(service.findOneByLocation).calledWith('456, 456').mockResolvedValue({
        pubId: '2',
        name: 'this is also a Pub',
        coordinates: '456, 456',
        rating: 5,
        reviewCount: 1,
        url: '',
      });
      const result = await service.findOneByLocation('456, 456');
      expect(result).toEqual({
        ...secondPub,
        rating: 5,
        reviewCount: 1,
        url: '',
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
