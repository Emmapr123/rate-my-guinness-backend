import { Test, TestingModule } from '@nestjs/testing';
import { when } from 'jest-when';
import { Pub } from './entities/pub.entity';
import { PubController } from './pub.controller';
import { PubService } from './pub.service';

const firstPub: Pub = {
  pubId: '3',
  name: 'the very first Pub',
  coordinates: '',
  rating: 8,
  reviewCount: 1,
  url: '',
};
const pubByCoordinates: Pub = {
  pubId: '8',
  name: 'the very first Pub',
  coordinates: '123, 123',
  rating: 8,
  reviewCount: 1,
  url: '',
};
const newPub = {
  PubId: '1',
  name: 'This is a new Pub',
  coordinates: '453, 453',
};
const updatedPub = { PubId: '3', name: 'an updated Pub' };

describe('PubsController', () => {
  let controller: PubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PubController],
      providers: [
        {
          provide: PubService,
          useValue: {
            insertOne: jest
              .fn()
              .mockImplementation(() => Promise.resolve({ id: 1, ...newPub })),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findOneByLocation: jest
              .fn()
              .mockImplementation(() => Promise.resolve(newPub)),
            update: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve({ id: 3, ...updatedPub }),
              ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PubController>(PubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('post', () => {
    it('should create a new Pub', async () => {
      await expect(controller.insertOne(newPub)).resolves.toEqual({
        id: 1,
        ...newPub,
      });
    });
  });

  describe('get', () => {
    it('should get all pubs', async () => {
      controller.findAll = jest.fn();

      when(controller.findAll).mockResolvedValue([firstPub, pubByCoordinates]);
      await expect(controller.findAll()).resolves.toEqual([
        firstPub,
        pubByCoordinates,
      ]);
    });

    it('should get one pub by coordinates', async () => {
      controller.findAll = jest.fn();
      when(controller.findAll)
        .calledWith('123, 123')
        .mockResolvedValue(pubByCoordinates);
      await expect(controller.findAll('123, 123')).resolves.toEqual(
        pubByCoordinates,
      );
    });

    it('should get one pub by the pubId', async () => {
      controller.findOne = jest.fn();
      when(controller.findOne)
        .calledWith('3')
        .mockResolvedValue({ ...firstPub });
      await expect(controller.findOne('3')).resolves.toEqual(firstPub);
    });
  });

  describe('patch', () => {
    it('should update an account', async () => {
      await expect(controller.update('3', updatedPub)).resolves.toEqual({
        id: 3,
        ...updatedPub,
      });
    });
  });

  describe('delete', () => {
    it('should remove a Pub', async () => {
      await expect(controller.delete('3')).resolves.toEqual(undefined);
    });
  });
});
