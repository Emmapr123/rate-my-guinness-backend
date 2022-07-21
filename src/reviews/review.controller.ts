import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';

@Controller('api/v1/review')
export class ReviewController {
  constructor(private readonly ReviewsService: ReviewService) {}

  @Post()
  insertOne(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.ReviewsService.insertOne(createReviewDto);
  }

  @Get()
  findAll(): Promise<Review[]> {
    return this.ReviewsService.findAll();
  }

  @Get(':reviewId')
  async findOne(@Param('reviewId') reviewId: string): Promise<Review> {
    return this.ReviewsService.findOne(reviewId);
  }

  @Patch(':reviewId')
  async update(
    @Param('reviewId') reviewId: string,
    @Body() review: CreateReviewDto,
  ) {
    return this.ReviewsService.update(reviewId, review);
  }

  @Delete(':reviewId')
  async delete(@Param('reviewId') reviewId: string): Promise<any> {
    return this.ReviewsService.remove(reviewId);
  }
}
