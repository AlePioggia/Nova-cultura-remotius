import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewResponse } from 'src/app/interfaces/review.interface';
import { ReviewService } from '../../services/review.service';
import { AuthenticationService } from 'src/app/src/login/services/authentication.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent implements OnInit {
  reviews: ReviewResponse[]; // Assuming you have a Review type
  filteredReviews: ReviewResponse[]; // Displayed reviews
  teacherMail: string = '';
  fromMenu: boolean = false;
  isTeacher: boolean;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['email']) {
        this.teacherMail = params['email'];
      } else {
        this.teacherMail = null;
      }
      if (params.hasOwnProperty('fromMenu')) {
        console.log(params['fromMenu']);
        this.fromMenu = params['fromMenu'] === 'true';
      } else {
        this.fromMenu = false;
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.isTeacher = await this.authenticationService.isTeacher();

    if (this.fromMenu && !this.isTeacher) {
      const student: any =
        await this.authenticationService.getAllUserInformations();
      console.log(student);
      console.log(this.fromMenu);
      this.reviews = await this.reviewService.getByStudent(student?.mail);
    } else {
      if (this.teacherMail) {
        this.reviews = await this.reviewService.getByTeacher(this.teacherMail);
      } else {
        const teacher: any =
          await this.authenticationService.getAllUserInformations();
        this.reviews = await this.reviewService.getByTeacher(teacher?.mail);
      }
    }
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredReviews = this.reviews.filter(
      (review) =>
        review.title.toLowerCase().includes(searchTerm) ||
        review.description.toLowerCase().includes(searchTerm)
    );
  }

  getTargetName(itemData: any) {
    if (this.fromMenu && this.isTeacher) {
    }
  }
}
