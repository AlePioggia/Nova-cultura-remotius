import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/constants';
import { IReviewRequest } from 'src/app/interfaces/review.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  baseUrl: string = '';

  constructor(private http: HttpClient) {
    this.baseUrl = BASE_URL + 'reviews/';
  }

  async createReview(reviewRequest: IReviewRequest) {
    this.http.post(`${this.baseUrl}`, reviewRequest).toPromise();
  }

  async getByTeacher(teacherMail: string): Promise<any> {
    return this.http.get(`${this.baseUrl}teacher/${teacherMail}`).toPromise();
  }

  async getByStudent(studentMail: string) {
    return this.http.get(`${this.baseUrl}student/${studentMail}`).toPromise();
  }

  async updateReview(reviewId: string, reviewRequest: IReviewRequest) {
    this.http.patch(`${this.baseUrl}${reviewId}`, reviewRequest).toPromise();
  }
}
