import { Component, OnInit } from '@angular/core';
import {
  IReviewRequest,
  ReviewRequest,
} from 'src/app/interfaces/review.interface';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-insert-popup',
  templateUrl: './insert-popup.component.html',
  styleUrls: ['./insert-popup.component.css'],
})
export class InsertPopupComponent implements OnInit {
  isPopupVisible = true;

  reviewRequest: IReviewRequest = new ReviewRequest();

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reviewRequest.vote = 1;
    this.route.queryParams.subscribe((params) => {
      this.reviewRequest.teacherMail = params['email'];
    });
  }

  ngOnInit(): void {
    this.showReviewPopup();
  }

  setVote(vote: number) {
    this.reviewRequest.vote = vote;
  }

  showReviewPopup() {
    this.isPopupVisible = true;
  }

  hideReviewPopup() {
    this.isPopupVisible = false;
    this.router.navigate(['../home']);
  }

  submitReview() {
    this.reviewService.createReview(this.reviewRequest);
    this.hideReviewPopup();
  }
}
