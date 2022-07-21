import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pub } from '../../src/pubs/entities/pub.entity';
import { PubModule } from '../../src/pubs/pub.module';
import { agent as request } from 'supertest';

const newPub = { name: 'this is a new Pub' };
const existingPubs = [
  { name: 'This one is not new' },
  { name: 'neither is this one' },
];
const changedPub = { name: 'This is a changed Pub' };

describe('Pubs (e2e)', () => {
  let app: INestApplication;

  const mockPubsRepository = {
    find: jest.fn().mockResolvedValue(existingPubs),
    save: jest.fn().mockResolvedValue(newPub),
    create: jest.fn().mockResolvedValue(newPub),
    update: jest.fn().mockResolvedValue(changedPub),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PubModule],
    })
      .overrideProvider(getRepositoryToken(Pub))
      .useValue(mockPubsRepository)
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

  it('/api/v1/pub CREATE', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/pub')
      .send(newPub)
      .expect(201);
    expect(response.body).toMatchObject(newPub);
  });

  it('/api/v1/pub GET', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/pub')
      .expect(200);
    expect(response.body).toMatchObject(existingPubs);
  });

  it('/api/v1/pub UPDATE', async () => {
    const response = await request(app.getHttpServer())
      .patch('/api/v1/pub/1')
      .send(changedPub)
      .expect(200);
    expect(response.body).toMatchObject(changedPub);
  });

  it('/api/v1/pub DELETE', async () => {
    await request(app.getHttpServer()).delete('/api/v1/pub/1').expect(200);
  });
});
