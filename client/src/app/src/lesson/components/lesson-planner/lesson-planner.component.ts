import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../services/lesson.service';
import { ILessonRequest } from 'src/app/interfaces/lesson.interface';
import { ActivatedRoute } from '@angular/router';
import { confirm } from 'devextreme/ui/dialog';
import { WalletService } from 'src/app/src/wallet/services/wallet.service';
import { PurchaseService } from 'src/app/src/wallet/services/purchase.service';

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
    private purchaseService: PurchaseService
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
    console.log(e.appointmentData);
    const lessonId = e.appointmentData.id;
    confirm(
      'Do you want to book this lesson? You will spend 1 token',
      'Confirmation'
    ).then(async (result) => {
      result ? await this.bookLesson(lessonId) : alert('peggio per te');
    });
  }

  async bookLesson(lessonId: any) {
    try {
      await this.purchaseService.buyLesson(+lessonId, this.teacherMail);
      await this.walletService.withdraw(1);
      await this.lessonService.bookLesson(lessonId, this.studentMail);
    } catch (error) {
      throw error;
    }
  }
}
