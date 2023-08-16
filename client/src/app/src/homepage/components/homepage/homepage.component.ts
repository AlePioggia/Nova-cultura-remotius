import { AuthenticationService } from 'src/app/src/login/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {
  CreateUserRequest,
  ICreateUserRequest,
} from 'src/app/interfaces/user.interface';
import { ReviewService } from 'src/app/src/review/services/review.service';
import { IReviewAverage } from 'src/app/interfaces/review.interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  data: ICreateUserRequest[] = [];
  filteredData: ICreateUserRequest[] = [];
  reviews: IReviewAverage[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private reviewService: ReviewService
  ) {}

  async ngOnInit(): Promise<void> {
    const teachers = await this.authenticationService.getTeachers();
    this.data = teachers;
    this.filteredData = [...this.data];
    const reviews = await this.reviewService.getAverageRatings();
    this.reviews = reviews;
    console.log(this.reviews);
  }

  onSearch(query: string) {
    this.filteredData = this.data.filter((item) =>
      (item.firstName + ' ' + item.lastName).includes(query)
    );
  }

  async isTeacher(): Promise<boolean> {
    return await this.authenticationService.isTeacher();
  }
}
