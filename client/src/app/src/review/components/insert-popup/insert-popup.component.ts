import { Component, OnInit } from '@angular/core';
import {
  IReviewRequest,
  ReviewRequest,
} from 'src/app/interfaces/review.interface';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';

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
    private route: ActivatedRoute,
    private toastService: ToastService
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

  async submitReview() {
    try {
      await this.reviewService.createReview(this.reviewRequest);
      this.toastService.showSuccess('Recensione inserita con successo!');
      this.hideReviewPopup();
    } catch (error) {
      this.toastService.showError(
        "Errore durante l'inserimento della recensione. Si prega di riprovare."
      );
    }
  }
}
