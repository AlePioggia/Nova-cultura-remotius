import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { AuthenticationService } from 'src/app/src/login/services/authentication.service';
import {
  ILessonRequest,
  ILessonSimpleRequest,
} from 'src/app/interfaces/lesson.interface';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';

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
    private routerService: Router,
    private toastService: ToastService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await this.authenticationService.getAllUserInformations();
    this.lessonService.getLessons(user.mail).then((data) => {
      this.lessons = data;
    });
  }

  async onLessonAdding(e) {
    const data: ILessonRequest = e.appointmentData;
    try {
      await this.lessonService.createLesson(data);
      this.toastService.showSuccess('inserimento avvenuto con successo!');
    } catch (error) {
      this.toastService.showError(
        "errore nell'inserimento, contattare il servizio clienti"
      );
    }
  }

  async onLessonUpdating(e) {
    const data: ILessonSimpleRequest = {
      ...(e.oldData as ILessonSimpleRequest),
      ...(e.newData as ILessonSimpleRequest),
    };
    try {
      await this.lessonService.patchLesson(e.oldData.id, data);
      this.toastService.showSuccess('Lezione aggiornata con successo!');
    } catch (error) {
      this.toastService.showError(
        "Errore nell'aggiornamento della lezione, contattare il servizio clienti"
      );
    }
  }

  async onLessonDeleting(e) {
    try {
      await this.lessonService.deleteLesson(e.appointmentData.id);
      this.toastService.showSuccess('Lezione eliminata con successo!');
    } catch (error) {
      this.toastService.showError(
        "Errore nell'eliminazione della lezione, contattare il servizio clienti"
      );
    }
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
