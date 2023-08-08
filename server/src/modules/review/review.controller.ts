// reviews.controller.ts
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { CreateReviewDto } from 'src/dto/review.dto';
import { ReviewService } from './review.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewsService: ReviewService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(createReviewDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@Param('id') id: string, @Body() review: Partial<CreateReviewDto>) {
        return this.reviewsService.update(id, review);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('teacher/:teacherMail')
    findByTeacher(@Param('teacherMail') teacherMail: string) {
        return this.reviewsService.findByTeacher(teacherMail);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('student/:studentMail')
    findByStudent(@Param('studentMail') studentMail: string) {
        return this.reviewsService.findByStudent(studentMail);
    }
}
