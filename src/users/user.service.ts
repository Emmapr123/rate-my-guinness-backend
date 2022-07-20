import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  insertOne(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(userId: string): Promise<User> {
    const user = this.userRepository.findOne({
      where: { userId: userId },
    });
    return user;
  }

  update(userId: string, user: CreateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(userId, user);
  }

  remove(userId: string): Promise<DeleteResult> {
    return this.userRepository.delete(userId);
  }
}
