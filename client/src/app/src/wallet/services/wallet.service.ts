import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private baseUrl: string = ''; // Sostituisci con l'URL effettivo del tuo back-end

  constructor(private http: HttpClient) {
    this.baseUrl = BASE_URL + 'wallets/';
  }

  getWallet(): Promise<any> {
    return this.http.get<any>(`${this.baseUrl}`).toPromise();
  }

  createWallet(): Promise<any> {
    return this.http.post<any>(`${this.baseUrl}`, {}).toPromise();
  }

  deposit(amount: number): Promise<any> {
    return this.http
      .post<any>(`${this.baseUrl}deposit`, {
        amount: amount,
      })
      .toPromise();
  }

  withdraw(amount: number): Promise<any> {
    return this.http
      .post<any>(`${this.baseUrl}withdraw`, {
        amount: amount,
      })
      .toPromise();
  }

  createWalletWithMail(mail: string): Promise<any> {
    return this.http
      .post<any>(`${this.baseUrl}mail`, { mail: mail })
      .toPromise();
  }
}
