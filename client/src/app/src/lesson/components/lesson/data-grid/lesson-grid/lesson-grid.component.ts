import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILessonRequest,
  ILessonSimpleRequest,
} from 'src/app/interfaces/lesson.interface';
import { LessonService } from 'src/app/src/lesson/services/lesson.service';
import { AuthenticationService } from 'src/app/src/login/services/authentication.service';

@Component({
  selector: 'app-lesson-grid',
  templateUrl: './lesson-grid.component.html',
  styleUrls: ['./lesson-grid.component.css'],
})
export class LessonGridComponent implements OnInit {
  lessons: any[];

  constructor(
    private lessonService: LessonService,
    private authenticationService: AuthenticationService,
    private routerService: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await this.authenticationService.getAllUserInformations();
    await this.lessonService.getLessons(user.mail).then((data) => {
      this.lessons = data;
    });
  }

  async rowUpdating(e) {
    const data: ILessonSimpleRequest = {
      ...(e.oldData as ILessonSimpleRequest),
      ...(e.newData as ILessonSimpleRequest),
    };
    await this.lessonService.patchLesson(e.oldData.id, data);
  }

  rowRemoving(e) {
    this.lessonService.deleteLesson(e.data.id);
  }

  async rowInserted(e) {
    const data: ILessonRequest = e.data;
    await this.lessonService.createLesson(data);
  }

  toggleView() {
    this.routerService.navigate(['../lesson/teacher-planner']);
  }
}
