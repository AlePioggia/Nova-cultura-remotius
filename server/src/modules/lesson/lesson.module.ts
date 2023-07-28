/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from 'src/schemas/lesson.schema';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { LessonsRepository } from 'src/repositories/lessons.repository';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Lesson.name, schema: LessonSchema },
        ]),
    ],
    controllers: [LessonController],
    providers: [LessonService, LessonsRepository, ConfigService],
})
export class LessonModule {}
