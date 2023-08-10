import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewResponse } from 'src/app/interfaces/review.interface';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent implements OnInit {
  reviews: ReviewResponse[]; // Assuming you have a Review type
  filteredReviews: ReviewResponse[]; // Displayed reviews
  teacherMail: string = '';

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.teacherMail = params['email'];
    });
  }

  async ngOnInit(): Promise<void> {
    await this.reviewService.getByTeacher(this.teacherMail).then((data) => {
      this.reviews = data;
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredReviews = this.reviews.filter(
      (review) =>
        review.title.toLowerCase().includes(searchTerm) ||
        review.description.toLowerCase().includes(searchTerm)
    );
  }
}
