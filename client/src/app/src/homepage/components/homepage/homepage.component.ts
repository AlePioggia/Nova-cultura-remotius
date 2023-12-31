import { AuthenticationService } from 'src/app/src/login/services/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CreateUserRequest,
  ICreateUserRequest,
} from 'src/app/interfaces/user.interface';
import { ReviewService } from 'src/app/src/review/services/review.service';
import { IReviewAverage } from 'src/app/interfaces/review.interface';
import { DxPopoverComponent } from 'devextreme-angular';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  data: ICreateUserRequest[] = [];
  reviews: IReviewAverage[] = [];

  filteredData: ICreateUserRequest[] = []; // i dati attualmente visualizzati
  ratingFilter: number = null;
  @ViewChild(DxPopoverComponent, { static: false }) popover: DxPopoverComponent;
  showFilters = false;
  isTeacher: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private reviewService: ReviewService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isTeacher = await this.authenticationService.isTeacher();

    const data = this.isTeacher
      ? await this.authenticationService.getStudents()
      : await this.authenticationService.getTeachers();

    this.data = data;
    this.filteredData = [...this.data];

    const reviews = await this.reviewService.getAverageRatings();
    this.reviews = reviews;

    if (!(await this.authenticationService.isTeacher())) {
      this.orderDataByReview(this.data);
      this.orderDataByReview(this.filteredData);
    }
  }

  orderDataByReview(data: any) {
    data.sort((a, b) => {
      const averageRatingA =
        this.reviews.find((x) => x.teacherMail === a.mail).averageRating || 0;
      const averageRatingB =
        this.reviews.find((x) => x.teacherMail === b.mail).averageRating || 0;

      return averageRatingB - averageRatingA;
    });
  }

  onSearch(query: string) {
    this.filteredData = this.data.filter((item) =>
      (item.firstName + ' ' + item.lastName).includes(query)
    );
  }

  onRatingFilter(rating: any) {
    this.ratingFilter = rating;
    this.applyFilters();
  }

  applyFilters() {
    if (this.ratingFilter) {
      this.filteredData = this.data.filter((item) => {
        const rating = this.reviews
          .find((x) => x.teacherMail === item.mail)
          .averageRating.toFixed();
        return +rating === this.ratingFilter;
      });
    } else {
      // se non ci sono filtri, mostra tutti i dati
      this.filteredData = [...this.data];
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
