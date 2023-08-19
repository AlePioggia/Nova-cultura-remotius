import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReviewAverage } from 'src/app/interfaces/review.interface';
import { ICreateUserRequest } from 'src/app/interfaces/user.interface';
import { AuthenticationService } from 'src/app/src/login/services/authentication.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() data: ICreateUserRequest[] = [];
  @Input() reviews: IReviewAverage[] = [];
  imageUrl: string = 'assets/idiot.jpg';
  studentMail: string;
  isTeacher: boolean;

  constructor(
    private routerService: Router,
    private authenticationService: AuthenticationService
  ) {}

  async ngOnInit() {
    const user: ICreateUserRequest =
      await this.authenticationService.getAllUserInformations();
    this.studentMail = user.mail;
    const teacher = await this.authenticationService.isTeacher();
    this.isTeacher = teacher;
  }

  openChat(itemData: ICreateUserRequest) {
    this.routerService.navigate(['../chat'], {
      queryParams: { email: itemData.mail },
    });
  }

  openPopup(itemData: ICreateUserRequest) {
    this.routerService.navigate(['../review/insert'], {
      queryParams: { email: itemData.mail },
    });
  }

  getAverageRating(mail: string): number {
    const review = this.reviews.find((r) => r.teacherMail === mail);
    return review ? +review.averageRating.toFixed() : null;
  }

  showReviews(itemData: ICreateUserRequest) {
    this.routerService.navigate(['../review/show'], {
      queryParams: { email: itemData.mail },
    });
  }

  makeReservation(itemData: ICreateUserRequest) {
    this.routerService.navigate(['../lesson/planner'], {
      queryParams: { email: itemData.mail, studentMail: this.studentMail },
    });
  }
}
