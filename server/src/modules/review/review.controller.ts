// reviews.controller.ts
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateReviewDto } from 'src/dto/review.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewService) {}

    @Post()
    create(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(createReviewDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() review: Partial<CreateReviewDto>) {
        return this.reviewsService.update(id, review);
    }

    @Get('teacher/:teacherMail')
    findByTeacher(@Param('teacherMail') teacherMail: string) {
        return this.reviewsService.findByTeacher(teacherMail);
    }

    @Get('student/:studentMail')
    findByStudent(@Param('studentMail') studentMail: string) {
        return this.reviewsService.findByStudent(studentMail);
    }
}
