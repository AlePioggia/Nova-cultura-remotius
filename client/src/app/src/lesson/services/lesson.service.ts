import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/constants';
import { ILessonRequest } from 'src/app/interfaces/lesson.interface';
import { HelperService } from 'src/app/shared/services/service-helper.service';
import { AuthenticationService } from '../../login/services/authentication.service';
import { ICreateUserRequest } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  baseUrl: string = '';

  constructor(
    private helperService: HelperService,
    private authenticationService: AuthenticationService
  ) {
    this.baseUrl = BASE_URL + 'lessons/';
  }

  async createLesson(lessonRequest: ILessonRequest) {
    const headers = new HttpHeaders({
      Authorization: sessionStorage.getItem('access_token'),
    });

    const teacher: ICreateUserRequest =
      await this.authenticationService.getAllUserInformations();

    lessonRequest.teacherMail = teacher.mail;
    lessonRequest.studentMail = '';

    this.helperService.post(this.baseUrl + 'create', lessonRequest, headers);
  }
}
