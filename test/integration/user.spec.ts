import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/users/entities/user.entity';
import { UserModule } from '../../src/users/user.module';
import { agent as request } from 'supertest';

const newUser = { name: 'this is a new User' };
const existingUsers = [
  { name: 'This one is not new' },
  { name: 'neither is this one' },
];
const changedUser = { name: 'This is a changed User' };

describe('Users (e2e)', () => {
  let app: INestApplication;

  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue(existingUsers),
    save: jest.fn().mockResolvedValue(newUser),
    create: jest.fn().mockResolvedValue(newUser),
    update: jest.fn().mockResolvedValue(changedUser),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/invalid GET', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/invalid');
    expect(response.status).toBe(404);
  });

  it('/api/v1/user CREATE', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/user')
      .send(newUser)
      .expect(201);
    expect(response.body).toMatchObject(newUser);
  });

  it('/api/v1/user GET', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/user')
      .expect(200);
    expect(response.body).toMatchObject(existingUsers);
  });

  it('/api/v1/user UPDATE', async () => {
    const response = await request(app.getHttpServer())
      .patch('/api/v1/user/1')
      .send(changedUser)
      .expect(200);
    expect(response.body).toMatchObject(changedUser);
  });

  it('/api/v1/user DELETE', async () => {
    await request(app.getHttpServer()).delete('/api/v1/user/1').expect(200);
  });
});
