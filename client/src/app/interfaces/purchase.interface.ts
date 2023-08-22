export interface IPurchase {
  operationId: number;
  amount: number;
  lessonId: number;
  teacherMail: string;
}

export class Purchase implements IPurchase {
  operationId: number;
  amount: number;
  lessonId: number;
  teacherMail: string;
}
