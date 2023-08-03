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
  studentMail: string;

  constructor(
    private lessonService: LessonService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.teacherMail = params['email'];
      this.studentMail = params['studentMail'];
    });
  }

  async ngOnInit(): Promise<void> {
    const data: ILessonRequest[] =
      await this.lessonService.getLessonsByTeacherMail(this.teacherMail);
    this.lessonsData = data;
  }

  onAppointmentClick(e: any) {
    const lessonId = e.appointmentData.id;
    confirm('Do you want to book this lesson?', 'Confirmation').then(
      async (result) => {
        result
          ? await this.lessonService.bookLesson(lessonId, this.studentMail)
          : alert('peggio per te');
      }
    );
  }
}
