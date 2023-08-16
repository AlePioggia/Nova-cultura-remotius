export interface IReviewRequest {
  title: string;
  teacherMail: string;
  vote: number;
  description: string;
}

export class ReviewRequest implements IReviewRequest {
  title: string;
  teacherMail: string;
  vote: number;
  description: string;
}

export interface IReviewResponse {
  title: string;
  teacherMail: string;
  studentMail: string;
  vote: number;
  description: string;
}

export class ReviewResponse implements IReviewResponse {
  title: string;
  teacherMail: string;
  studentMail: string;
  vote: number;
  description: string;
}

export interface IReviewAverage {
  averageRating: number;
  teacherMail: string;
}

export class ReviewAverage implements IReviewAverage {
  averageRating: number;
  teacherMail: string;
}
