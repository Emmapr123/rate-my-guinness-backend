import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const firstUser = {
  userId: '3',
  userName: 'the very first User',
};
const newUser = { userId: '1', userName: 'This is a new User' };
const updatedUser = { userId: '3', userName: 'an updated User' };

describe('RelaxedUsersController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            insertOne: jest
              .fn()
              .mockImplementation(() => Promise.resolve({ id: 1, ...newUser })),
            findAll: jest
              .fn()
              .mockImplementation(() => Promise.resolve([firstUser, newUser])),
            findOne: jest
              .fn()
              .mockImplementation(() => Promise.resolve(firstUser)),
            update: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve({ id: 3, ...updatedUser }),
              ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('post', () => {
    it('should create a new User', async () => {
      await expect(controller.insertOne(newUser)).resolves.toEqual({
        id: 1,
        ...newUser,
      });
    });
  });

  describe('get', () => {
    it('should get all accounts', async () => {
      await expect(controller.findAll()).resolves.toEqual([firstUser, newUser]);
    });

    it('should get one restraint by the restraintId', async () => {
      await expect(controller.findOne('3')).resolves.toEqual(firstUser);
    });
  });

  describe('patch', () => {
    it('should update an account', async () => {
      await expect(controller.update('3', updatedUser)).resolves.toEqual({
        id: 3,
        ...updatedUser,
      });
    });
  });

  describe('delete', () => {
    it('should remove a User', async () => {
      await expect(controller.delete('3')).resolves.toEqual(undefined);
    });
  });
});
