import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  insertOne(review: CreateReviewDto): Promise<Review> {
    const newReview = this.reviewRepository.create(review);
    return this.reviewRepository.save(newReview);
  }

  findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  findOne(reviewId: string): Promise<Review> {
    const review = this.reviewRepository.findOne({
      where: { reviewId: reviewId },
    });
    return review;
  }

  update(reviewId: string, review: CreateReviewDto): Promise<UpdateResult> {
    return this.reviewRepository.update(reviewId, review);
  }

  remove(reviewId: string): Promise<DeleteResult> {
    return this.reviewRepository.delete(reviewId);
  }
}
