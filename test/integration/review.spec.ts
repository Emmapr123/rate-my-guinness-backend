import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from '../../src/reviews/entities/review.entity';
import { ReviewModule } from '../../src/reviews/review.module';
import { agent as request } from 'supertest';
import { User } from '../../src/users/entities/user.entity';
import { Pub } from '../../src/pubs/entities/pub.entity';

const newReview = {
  rating: 7,
  reviewTitle: 'this is a review title',
  reviewBody: 'this is a review body',
};

const existingReviews = [
  {
    rating: 4,
    reviewTitle: 'this is a different review title',
    reviewBody: 'this is an other review body',
  },
  {
    rating: 6,
    reviewTitle: 'this is an updated review title',
    reviewBody: 'this is an updated review body',
  },
];

const changedReview = {
  rating: 6,
  reviewTitle: 'this is an updated review title',
  reviewBody: 'this is an updated review body',
};

describe('Reviews (e2e)', () => {
  let app: INestApplication;

  const mockReviewsRepository = {
    find: jest.fn().mockResolvedValue(existingReviews),
    save: jest.fn().mockResolvedValue(newReview),
    create: jest.fn().mockResolvedValue(newReview),
    update: jest.fn().mockResolvedValue(changedReview),
    delete: jest.fn(),
  };

  const mockUsersRepository = {};
  const mockPubsRepository = {};
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ReviewModule],
    })
      .overrideProvider(getRepositoryToken(Review))
      .useValue(mockReviewsRepository)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
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

  it('/api/v1/review CREATE', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/review')
      .send(newReview)
      .expect(201);
    expect(response.body).toMatchObject(newReview);
  });

  it('/api/v1/review GET', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/review')
      .expect(200);
    expect(response.body).toMatchObject(existingReviews);
  });

  it('/api/v1/review UPDATE', async () => {
    const response = await request(app.getHttpServer())
      .patch('/api/v1/review/1')
      .send(changedReview)
      .expect(200);
    expect(response.body).toMatchObject(changedReview);
  });

  it('/api/v1/review DELETE', async () => {
    await request(app.getHttpServer()).delete('/api/v1/review/1').expect(200);
  });
});
