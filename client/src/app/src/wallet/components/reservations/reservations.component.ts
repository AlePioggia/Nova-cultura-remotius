import { Component, OnInit } from '@angular/core';
import { IPurchase } from 'src/app/interfaces/purchase.interface';
import { PurchaseService } from '../../services/purchase.service';
import { LessonService } from 'src/app/src/lesson/services/lesson.service';
import { ILessonRequest } from 'src/app/interfaces/lesson.interface';
import { AuthenticationService } from 'src/app/src/login/services/authentication.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements OnInit {
  purchases: IPurchase[] = [];
  lessons: ILessonRequest[] = [];
  displayData: any[] = [];

  constructor(
    private purchaseService: PurchaseService,
    private lessonService: LessonService,
    private authorizationService: AuthenticationService
  ) {}

  async ngOnInit(): Promise<void> {
    if (await this.authorizationService.isTeacher()) {
      const teacher = await this.authorizationService.getAllUserInformations();
      this.lessons = await this.lessonService.getLessonsByTeacherMail(
        teacher?.mail
      );
      this.purchases = await this.purchaseService.getTeacherPurchases();
    } else {
      this.lessons = await this.lessonService.getLessonsForLoggedInUser();
      this.purchases = await this.purchaseService.getStudentPurchases();
    }

    this.displayData = this.purchases.map((purchase) => {
      const relatedLesson = this.lessons.find(
        (lesson) => lesson.teacherMail === purchase.teacherMail
      );
      return {
        ...purchase,
        ...relatedLesson,
      };
    });
  }

  operationIdToName = (data: any) => {
    return data.operationId === 0 ? 'acquisto' : 'altro';
  };
}
