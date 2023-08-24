import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    Headers,
    HttpException,
    HttpStatus,
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
        try {
            const token = jwt.decode(authHeader.split(' ')[1]);
            return await this.reviewsService.create(createReviewDto, token);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() review: Partial<CreateReviewDto>,
    ) {
        try {
            return await this.reviewsService.update(id, review);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('teacher/:teacherMail')
    async findByTeacher(@Param('teacherMail') teacherMail: string) {
        try {
            return await this.reviewsService.findByTeacher(teacherMail);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('student/:studentMail')
    async findByStudent(@Param('studentMail') studentMail: string) {
        try {
            return await this.reviewsService.findByStudent(studentMail);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('all')
    async getAllStudentReviews(): Promise<any> {
        try {
            return await this.reviewsService.getAll();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('average')
    async getAverageRatings(): Promise<any[]> {
        try {
            return await this.reviewsService.getAverageRatings();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
