import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { AuthenticationService } from 'src/app/src/login/services/authentication.service';
import {
  ILessonRequest,
  ILessonSimpleRequest,
} from 'src/app/interfaces/lesson.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-planner',
  templateUrl: './teacher-planner.component.html',
  styleUrls: ['./teacher-planner.component.css'],
})
export class TeacherPlannerComponent implements OnInit {
  lessons: ILessonRequest[] = [];
  currentDate: Date = new Date();

  constructor(
    private lessonService: LessonService,
    private authenticationService: AuthenticationService,
    private routerService: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await this.authenticationService.getAllUserInformations();
    this.lessonService.getLessons(user.mail).then((data) => {
      this.lessons = data;
    });
  }

  async onLessonAdding(e) {
    const data: ILessonRequest = e.appointmentData;
    await this.lessonService.createLesson(data);
  }

  async onLessonUpdating(e) {
    const data: ILessonSimpleRequest = {
      ...(e.oldData as ILessonSimpleRequest),
      ...(e.newData as ILessonSimpleRequest),
    };
    await this.lessonService.patchLesson(e.oldData.id, data);
  }

  async onLessonDeleting(e) {
    await this.lessonService.deleteLesson(e.appointmentData.id);
  }

  onAppointmentFormOpening(e) {
    const { form } = e;
    form.option('items', [
      {
        label: {
          text: 'Subject',
        },
        dataField: 'subject',
        editorType: 'dxTextBox',
        editorOptions: {
          showClearButton: true,
        },
        colSpan: 2,
      },
      {
        label: {
          text: 'Start time',
        },
        dataField: 'startTime',
        editorType: 'dxDateBox',
        editorOptions: {
          width: '100%',
          type: 'datetime',
        },
      },
      {
        label: {
          text: 'End time',
        },
        dataField: 'endTime',
        editorType: 'dxDateBox',
        editorOptions: {
          width: '100%',
          type: 'datetime',
        },
      },
      {
        label: {
          text: 'Student',
        },
        dataField: 'studentMail',
        editorType: 'dxTextBox',
        editorOptions: {
          disabled: true,
        },
      },
      {
        label: {
          text: 'Notes',
        },
        dataField: 'notes',
        editorType: 'dxTextBox',
      },
    ]);
  }

  toggleView() {
    this.routerService.navigate(['../lesson']);
  }
}
