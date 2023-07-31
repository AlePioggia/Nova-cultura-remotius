import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { LessonDto } from 'src/dto/lesson.dto';
import { Lesson } from 'src/schemas/lesson.schema';
import { User } from 'src/schemas/user.schema';
import { LessonService } from './lesson.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('Lessons')
export class LessonController {
    constructor(private readonly lessonService: LessonService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Lesson> {
        return this.lessonService.getLessonById(id);
    }

    @Get()
    async getMany(): Promise<Lesson[]> {
        return this.lessonService.getLessons();
    }

    @Post('create')
    async createOne(@Body() dto: LessonDto) {
        return this.lessonService.createLesson(
            dto.startTime,
            dto.endTime,
            dto.subject,
            dto.notes,
        );
    }

    @Patch(':id')
    async update() {}
}
