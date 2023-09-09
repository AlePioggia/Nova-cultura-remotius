export interface IPurchase {
  operationId: number;
  amount: number;
  lessonId: string;
  teacherMail: string;
}

export class Purchase implements IPurchase {
  operationId: number;
  amount: number;
  lessonId: string;
  teacherMail: string;
}
