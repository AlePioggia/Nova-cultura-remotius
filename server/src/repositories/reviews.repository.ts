import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Review, ReviewDocument } from 'src/schemas/reviews.schema';

@Injectable()
export class ReviewsRepository {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    ) {}

    async findOne(reviewFilterQuery: FilterQuery<Review>): Promise<Review> {
        return this.reviewModel.findOne(reviewFilterQuery);
    }

    async find(reviewsFilterQuery: FilterQuery<Review>): Promise<Review[]> {
        return this.reviewModel.find(reviewsFilterQuery);
    }

    async create(review: Review): Promise<Review> {
        const createdReview = new this.reviewModel(review);
        return createdReview.save();
    }

    async findOneAndUpdate(
        reviewFilterQuery: FilterQuery<Review>,
        review: Partial<Review>,
    ) {
        return this.reviewModel.findOneAndUpdate(reviewFilterQuery, review);
    }

    async getAverageRatings(): Promise<any[]> {
        return this.reviewModel
            .aggregate([
                {
                    $group: {
                        _id: '$teacherMail',
                        averageRating: { $avg: '$vote' },
                    },
                },
                {
                    $project: {
                        teacherMail: '$_id',
                        averageRating: 1,
                        _id: 0,
                    },
                },
            ])
            .exec();
    }
}
