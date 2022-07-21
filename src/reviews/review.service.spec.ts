import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';

const firstReview: CreateReviewDto = {
  rating: 7,
  reviewTitle: 'this is a review title',
  reviewBody: 'this is a review body',
};
const secondReview: CreateReviewDto = {
  rating: 4,
  reviewTitle: 'this is a different review title',
  reviewBody: 'this is an other review body',
};
const arrayOfReviews: CreateReviewDto[] = [firstReview, secondReview];
const updatedReview: CreateReviewDto = {
  rating: 6,
  reviewTitle: 'this is an updated review title',
  reviewBody: 'this is an updated review body',
};

describe('ReviewService', () => {
  let service: ReviewService;
  let mockedRepository: Repository<Review>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useValue: {
            create: jest.fn().mockResolvedValue(firstReview),
            save: jest.fn().mockResolvedValue(firstReview),
            find: jest.fn().mockResolvedValue(arrayOfReviews),
            findOne: jest.fn().mockResolvedValue(secondReview),
            delete: jest.fn(),
            update: jest.fn().mockResolvedValue(updatedReview),
          },
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    mockedRepository = module.get<Repository<Review>>(
      getRepositoryToken(Review),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should succesfully create a Review', async () => {
      const result = await service.insertOne(firstReview);
      expect(mockedRepository.create).toBeCalledTimes(1);
      expect(mockedRepository.create).toBeCalledWith(firstReview);
      expect(mockedRepository.save).toBeCalledTimes(1);
      expect(result).toEqual(firstReview);
    });
  });

  describe('find', () => {
    it('should return all Reviews', async () => {
      const result = await service.findAll();
      expect(result).toEqual(arrayOfReviews);
    });
  });

  describe('findOne', () => {
    it('should return only one account', async () => {
      const result = await service.findOne('2');
      expect(result).toEqual(secondReview);
      expect(mockedRepository.findOne).toBeCalledWith({
        where: { reviewId: '2' },
      });
    });
  });

  describe('update', () => {
    it('should update a Review', async () => {
      const result = await service.update('1', updatedReview);
      expect(result).toEqual(updatedReview);
      expect(mockedRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should remove a Review', async () => {
      const result = await service.remove('1');
      expect(result).toEqual(undefined);
      expect(mockedRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
