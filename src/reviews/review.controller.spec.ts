import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

const firstReview = {
  rating: 7,
  reviewTitle: 'this is a review title',
  reviewBody: 'this is a review body',
};
const newReview = {
  rating: 4,
  reviewTitle: 'this is a different review title',
  reviewBody: 'this is an other review body',
};
const updatedReview = {
  rating: 6,
  reviewTitle: 'this is an updated review title',
  reviewBody: 'this is an updated review body',
};

describe('ReviewsController', () => {
  let controller: ReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: {
            insertOne: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve({ id: 1, ...newReview }),
              ),
            findAll: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve([firstReview, newReview]),
              ),
            findOne: jest
              .fn()
              .mockImplementation(() => Promise.resolve(firstReview)),
            update: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve({ id: 3, ...updatedReview }),
              ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('post', () => {
    it('should create a new review', async () => {
      await expect(controller.insertOne(newReview)).resolves.toEqual({
        id: 1,
        ...newReview,
      });
    });
  });

  describe('get', () => {
    it('should get all accounts', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        firstReview,
        newReview,
      ]);
    });

    it('should get one restraint by the restraintId', async () => {
      await expect(controller.findOne('3')).resolves.toEqual(firstReview);
    });
  });

  describe('patch', () => {
    it('should update an account', async () => {
      await expect(controller.update('3', updatedReview)).resolves.toEqual({
        id: 3,
        ...updatedReview,
      });
    });
  });

  describe('delete', () => {
    it('should remove a review', async () => {
      await expect(controller.delete('3')).resolves.toEqual(undefined);
    });
  });
});
