import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { ILessonRequest } from 'src/app/interfaces/lesson.interface';
import { ActivatedRoute } from '@angular/router';
import { confirm } from 'devextreme/ui/dialog';
import { WalletService } from 'src/app/src/wallet/services/wallet.service';
import { PurchaseService } from 'src/app/src/wallet/services/purchase.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { WebsocketService } from 'src/app/src/chat/services/web-socket.service';
import { ToastService } from 'src/app/shared/services/toast.service';

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
    private route: ActivatedRoute,
    private walletService: WalletService,
    private purchaseService: PurchaseService,
    private webSocketService: WebsocketService,
    private toastService: ToastService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.teacherMail = params['email'];
      this.studentMail = params['studentMail'];
    });
  }

  async ngOnInit(): Promise<void> {
    const data: ILessonRequest[] =
      await this.lessonService.getLessonsByTeacherMail(this.teacherMail, true);
    this.lessonsData = data;
  }

  onAppointmentClick(e: any) {
    const lessonId = e.appointmentData.id;
    confirm(
      'Do you want to book this lesson? You will spend 1 token',
      'Confirmation'
    ).then(async (result) => {
      result ? await this.bookLesson(lessonId) : null;
    });
  }

  async bookLesson(lessonId: any) {
    try {
      await this.purchaseService.buyLesson(lessonId, this.teacherMail);
      await this.walletService.withdraw(1);
      await this.lessonService.bookLesson(lessonId, this.studentMail);
      this.toastService.showSuccess('lezione prenotata con successo!');
      await this.sendMessage();
    } catch (error) {
      this.toastService.showError('errore nella prenotazione della lezione');
      throw error;
    }
  }

  async sendMessage() {
    await this.webSocketService.sendNotification(
      this.teacherMail,
      'Lo studente ' +
        this.studentMail +
        ' nella data ' +
        new Date() +
        ' ha prenotato la lezione con il professor ' +
        this.teacherMail
    );
  }
}
