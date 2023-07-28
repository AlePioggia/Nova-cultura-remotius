import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/constants';
import { ILessonRequest } from 'src/app/interfaces/lesson.interface';
import { HelperService } from 'src/app/shared/services/service-helper.service';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  baseUrl: string = '';

  constructor(private helperService: HelperService) {
    this.baseUrl = BASE_URL + 'lessons/';
  }

  async createLesson(lessonRequest: ILessonRequest) {
    this.helperService.post(this.baseUrl + 'create', lessonRequest);
  }
}
