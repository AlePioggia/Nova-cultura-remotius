import { Component } from '@angular/core';
import {
  ILessonRequest,
  LessonRequest,
} from 'src/app/interfaces/lesson.interface';
import { LessonService } from '../../services/lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css'],
})
export class LessonComponent {
  lesson: ILessonRequest = new LessonRequest();

  constructor(private lessonService: LessonService) {}

  submitForm() {
    this.lessonService.createLesson(this.lesson);
  }
}
