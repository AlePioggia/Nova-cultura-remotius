import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { ILessonRequest } from 'src/app/interfaces/lesson.interface';
import { ActivatedRoute } from '@angular/router';
import { confirm } from 'devextreme/ui/dialog';

@Component({
  selector: 'app-lesson-planner',
  templateUrl: './lesson-planner.component.html',
  styleUrls: ['./lesson-planner.component.css'],
})
export class LessonPlannerComponent implements OnInit {
  lessonsData: ILessonRequest[] = [];
  currentDate: Date = new Date();
  teacherMail: string;

  constructor(
    private lessonService: LessonService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.teacherMail = params['email'];
    });
  }

  async ngOnInit(): Promise<void> {
    const data: ILessonRequest[] =
      await this.lessonService.getLessonsByTeacherMail(this.teacherMail);
    this.lessonsData = data;
  }

  onAppointmentClick(e) {
    confirm('Do you want to book this lesson?', 'Confirmation').then(
      (result) => {
        result
          ? console.log('va bene')
          : console.log('eh allora perché hai cliccato?');
      }
    );
  }

  titleDisplayExpression = (subjects: string[]): string => {
    console.log(subjects.toString());
    return subjects.toString();
  };
}
