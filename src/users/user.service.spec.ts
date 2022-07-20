import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

const firstUser: CreateUserDto = {
  userId: '1',
  userName: 'this is a user',
};
const secondUser: CreateUserDto = {
  userId: '2',
  userName: 'this is also a user',
};
const arrayOfUsers: CreateUserDto[] = [firstUser, secondUser];
const updatedUser: CreateUserDto = {
  userId: '1',
  userName: 'an Updated user',
};

describe('userService', () => {
  let service: UserService;
  let mockedRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockResolvedValue(firstUser),
            save: jest.fn().mockResolvedValue(firstUser),
            find: jest.fn().mockResolvedValue(arrayOfUsers),
            findOne: jest.fn().mockResolvedValue(secondUser),
            delete: jest.fn(),
            update: jest.fn().mockResolvedValue(updatedUser),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    mockedRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should succesfully create a user', async () => {
      const result = await service.insertOne(firstUser);
      expect(mockedRepository.create).toBeCalledTimes(1);
      expect(mockedRepository.create).toBeCalledWith(firstUser);
      expect(mockedRepository.save).toBeCalledTimes(1);
      expect(result).toEqual(firstUser);
    });
  });

  describe('find', () => {
    it('should return all users', async () => {
      const result = await service.findAll();
      expect(result).toEqual(arrayOfUsers);
    });
  });

  describe('findOne', () => {
    it('should return only one account', async () => {
      const result = await service.findOne('2');
      expect(result).toEqual(secondUser);
      expect(mockedRepository.findOne).toBeCalledWith({
        where: { userId: '2' },
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const result = await service.update('1', updatedUser);
      expect(result).toEqual(updatedUser);
      expect(mockedRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should remove a user', async () => {
      const result = await service.remove('1');
      expect(result).toEqual(undefined);
      expect(mockedRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
