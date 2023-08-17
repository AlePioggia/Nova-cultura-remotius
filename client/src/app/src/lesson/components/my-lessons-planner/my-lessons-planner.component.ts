import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { ILessonRequest } from 'src/app/interfaces/lesson.interface';
import { AuthenticationService } from 'src/app/src/login/services/authentication.service';

@Component({
  selector: 'app-my-lessons-planner',
  templateUrl: './my-lessons-planner.component.html',
  styleUrls: ['./my-lessons-planner.component.css'],
})
export class MyLessonsPlannerComponent implements OnInit {
  lessonsData: ILessonRequest[] = [];
  user: any;
  currentDate: Date = new Date();

  constructor(
    private lessonService: LessonService,
    private authenticationService: AuthenticationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.lessonService.getLessonsForLoggedInUser().then((data) => {
      this.lessonsData = data;
    });

    this.user = this.authenticationService
      .getAllUserInformations()
      .then((data) => {
        console.log(data);
      });
  }
}
