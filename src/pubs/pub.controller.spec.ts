import { Test, TestingModule } from '@nestjs/testing';
import { PubController } from './pub.controller';
import { PubService } from './pub.service';

const firstPub = {
  PubId: '3',
  name: 'the very first Pub',
};
const newPub = { PubId: '1', name: 'This is a new Pub' };
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
            findAll: jest
              .fn()
              .mockImplementation(() => Promise.resolve([firstPub, newPub])),
            findOne: jest
              .fn()
              .mockImplementation(() => Promise.resolve(firstPub)),
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
    it('should get all accounts', async () => {
      await expect(controller.findAll()).resolves.toEqual([firstPub, newPub]);
    });

    it('should get one restraint by the restraintId', async () => {
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
