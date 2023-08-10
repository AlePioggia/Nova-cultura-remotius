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
        return this.lessonService.getLessonById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getMany(): Promise<Lesson[]> {
        return this.lessonService.getLessons();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('email/:teacherMail')
    async getLessonsByTeacherEmail(
        @Param('teacherMail') teacherMail: string,
        @Query('excludeStudent', new ParseBoolPipe()) isApproved: boolean,
    ): Promise<Lesson[]> {
        return this.lessonService.getLessonsByTeacherMail(
            teacherMail,
            isApproved,
        );
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async createOne(
        @Body() dto: LessonDto,
        @Headers('authorization') authHeader: string,
    ) {
        const token = jwt.decode(authHeader);
        return this.lessonService.createLesson(dto, token);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id/book')
    async bookLesson(
        @Param('id') id: string,
        @Body('studentMail') studentMail: string,
    ) {
        return this.lessonService.bookLesson(id, studentMail);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async patchLesson(@Param('id') id: string, @Body() dto: ILessonRequestDto) {
        return this.lessonService.patchLesson(id, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteLesson(@Param('id') id: string) {
        return await this.lessonService.deleteLesson(id);
    }
}
