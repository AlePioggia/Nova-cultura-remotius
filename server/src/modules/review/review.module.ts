import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/schemas/reviews.repository';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewsRepository } from 'src/repositories/reviews.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Review.name, schema: ReviewSchema },
        ]),
    ],
    controllers: [ReviewController],
    providers: [ReviewService, ReviewsRepository],
})
export class ReviewModule {}
