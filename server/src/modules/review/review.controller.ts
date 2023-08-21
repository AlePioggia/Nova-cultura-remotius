// reviews.controller.ts
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    Headers,
} from '@nestjs/common';
import { CreateReviewDto } from 'src/dto/review.dto';
import { ReviewService } from './review.service';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewsService: ReviewService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(
        @Body() createReviewDto: CreateReviewDto,
        @Headers('authorization') authHeader: string,
    ) {
        const token = jwt.decode(authHeader.split(' ')[1]);
        return this.reviewsService.create(createReviewDto, token);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() review: Partial<CreateReviewDto>,
    ) {
        return this.reviewsService.update(id, review);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('teacher/:teacherMail')
    async findByTeacher(@Param('teacherMail') teacherMail: string) {
        return this.reviewsService.findByTeacher(teacherMail);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('student/:studentMail')
    async findByStudent(@Param('studentMail') studentMail: string) {
        return this.reviewsService.findByStudent(studentMail);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('all')
    async getAllStudentReviews(): Promise<any> {
        return this.reviewsService.getAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('average')
    async getAverageRatings(): Promise<any[]> {
        return this.reviewsService.getAverageRatings();
    }
}
