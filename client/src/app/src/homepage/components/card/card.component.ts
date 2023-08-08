import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateUserRequest } from 'src/app/interfaces/user.interface';
import { AuthenticationService } from 'src/app/src/login/services/authentication.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() data: ICreateUserRequest[];
  imageUrl: string = 'assets/idiot.jpg';
  studentMail: string;
  isTeacher: boolean;

  isPopupVisible = false;
  review = {
    title: '',
    studentMail: '',
    teacherMail: '',
    vote: 0,
    description: '',
  };

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

  openChat() {
    console.log('Functionality not yet implemented');
  }

  makeReservation(itemData: ICreateUserRequest) {
    this.routerService.navigate(['../lesson/planner'], {
      queryParams: { email: itemData.mail, studentMail: this.studentMail },
    });
  }

  setVote(vote: number) {
    this.review.vote = vote;
  }

  showReviewPopup() {
    this.isPopupVisible = true;
  }

  hideReviewPopup() {
    this.isPopupVisible = false;
  }

  submitReview() {
    console.log(this.review);
    // Handle form submission logic here
    this.hideReviewPopup();
  }
}
