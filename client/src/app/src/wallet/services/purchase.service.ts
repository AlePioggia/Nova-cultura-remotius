import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/constants';
import { IPurchase, Purchase } from 'src/app/interfaces/purchase.interface';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private baseUrl: string = ''; // Sostituisci con l'URL effettivo del tuo back-end

  constructor(private http: HttpClient) {
    this.baseUrl = BASE_URL + 'purchases/';
  }

  private async createPurchase(purchase: IPurchase): Promise<any> {
    return this.http
      .post<any>(
        `${this.baseUrl}create?lessonId=${purchase.lessonId}&teacherMail=${purchase.teacherMail}`,
        purchase
      )
      .toPromise();
  }

  async buyLesson(lessonId: string, teacherMail: string) {
    const purchase: IPurchase = new Purchase();
    purchase.operationId = 0;
    purchase.amount = 1;
    purchase.lessonId = lessonId;
    purchase.teacherMail = teacherMail;
    await this.createPurchase(purchase);
  }

  async deposit(amount: number) {
    const purchase: IPurchase = new Purchase();
    purchase.operationId = 1;
    purchase.amount = amount;
    await this.createPurchase(purchase);
  }

  async withdraw(amount: number) {
    const purchase: IPurchase = new Purchase();
    purchase.operationId = 3;
    purchase.amount = amount;
    await this.createPurchase(purchase);
  }

  getStudentPurchases(): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}student`).toPromise();
  }

  getTeacherPurchases(): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}teacher`).toPromise();
  }
}
