import { ToastService } from './../../../../../../shared/services/toast.service';
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
    private routerService: Router,
    private toastService: ToastService
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
    try {
      await this.lessonService.patchLesson(e.oldData.id, data);
      this.toastService.showSuccess('Lezione aggiornata con successo!');
    } catch (error) {
      this.toastService.showError(
        "Errore nell'aggiornamento della lezione, si prega di riprovare"
      );
    }
  }

  async rowRemoving(e) {
    try {
      await this.lessonService.deleteLesson(e.data.id);
      this.toastService.showSuccess('Lezione eliminata con successo!');
    } catch (error) {
      this.toastService.showError(
        "Errore nell'eliminazione della lezione, si prega di riprovare"
      );
    }
  }

  async rowInserted(e) {
    const data: ILessonRequest = e.data;
    try {
      await this.lessonService.createLesson(data);
      this.toastService.showSuccess(
        'inserimento della lezione avvenuto con successo'
      );
    } catch (error) {
      this.toastService.showError("errore durante l'inserimento");
    }
  }

  toggleView() {
    this.routerService.navigate(['../lesson/teacher-planner']);
  }
}
