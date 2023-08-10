// reviews.service.ts
import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from 'src/dto/review.dto';
import { ReviewsRepository } from 'src/repositories/reviews.repository';
import { Review } from 'src/schemas/reviews.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReviewService {
    constructor(private readonly reviewsRepository: ReviewsRepository) {}

    create(reviewDto: CreateReviewDto, token: any) {
        console.log(token);
        return this.reviewsRepository.create({
            id: uuidv4(),
            teacherMail: reviewDto.teacherMail,
            studentMail: token?.mail ?? '',
            description: reviewDto.description,
            vote: reviewDto.vote,
            title: reviewDto.title,
        });
    }

    update(id: string, review: Partial<Review>) {
        return this.reviewsRepository.findOneAndUpdate({ id }, review);
    }

    findByTeacher(teacherMail: string) {
        return this.reviewsRepository.find({ teacherMail });
    }

    findByStudent(studentMail: string) {
        return this.reviewsRepository.find({ studentMail });
    }
}
