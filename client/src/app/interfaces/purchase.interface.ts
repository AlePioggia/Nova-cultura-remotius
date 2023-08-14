export interface IPurchase {
  operationId: number;
  amount: number;
  lessonId?: number;
}

export class Purchase implements IPurchase {
  operationId: number;
  amount: number;
  lessonId?: number;
}
