import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    Headers,
    ParseBoolPipe,
    Query,
    Delete,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ILessonRequestDto, LessonDto } from 'src/dto/lesson.dto';
import { Lesson } from 'src/schemas/lesson.schema';
import { LessonService } from './lesson.service';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Controller('Lessons')
export class LessonController {
    constructor(private readonly lessonService: LessonService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Lesson> {
        try {
            return await this.lessonService.getLessonById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getMany(): Promise<Lesson[]> {
        try {
            return await this.lessonService.getLessons();
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('email/:teacherMail')
    async getLessonsByTeacherEmail(
        @Param('teacherMail') teacherMail: string,
        @Query('excludeStudent', new ParseBoolPipe()) isApproved: boolean,
    ): Promise<Lesson[]> {
        try {
            return await this.lessonService.getLessonsByTeacherMail(
                teacherMail,
                isApproved,
            );
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my-lessons/list')
    async getMyLessons(@Headers('authorization') authHeader: string) {
        try {
            const token = jwt.decode(authHeader.split(' ')[1]);
            return await this.lessonService.getLessonsForLoggedInUser(token);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async createOne(
        @Body() dto: LessonDto,
        @Headers('authorization') authHeader: string,
    ) {
        try {
            const token = jwt.decode(authHeader.split(' ')[1]);
            return await this.lessonService.createLesson(dto, token);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id/book')
    async bookLesson(
        @Param('id') id: string,
        @Body('studentMail') studentMail: string,
    ) {
        try {
            return await this.lessonService.bookLesson(id, studentMail);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async patchLesson(@Param('id') id: string, @Body() dto: ILessonRequestDto) {
        try {
            return await this.lessonService.patchLesson(id, dto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteLesson(@Param('id') id: string) {
        try {
            return await this.lessonService.deleteLesson(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
