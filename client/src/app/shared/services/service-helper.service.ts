import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http: HttpClient) { }

  async get(url: string, headers?: any, params?: any): Promise<any> {
    try {
      return await firstValueFrom(
        this.http.request('GET', url, {
          headers,
          params,
        }).pipe(
          catchError(error => { throw error; })
        )
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(url: string, body: any, headers?: any, params?: any): Promise<any> {
    try {
      return await firstValueFrom(
        this.http.request('POST', url, {
          body,
          headers,
          params,
        }).pipe(
          catchError(error => { throw error; })
        )
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async put(url: string, body: any, headers?: any, params?: any): Promise<any> {
    try {
      return await firstValueFrom(
        this.http.request('PUT', url, {
          body,
          headers,
          params,
        }).pipe(
          catchError(error => { throw error; })
        )
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(url: string, headers?: any, params?: any): Promise<any> {
    try {
      return await firstValueFrom(
        this.http.request('DELETE', url, {
          headers,
          params,
        }).pipe(
          catchError(error => { throw error; })
        )
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): void {
    // Qui puoi gestire l'errore come preferisci. 
    console.error('An error occurred:', error);
  }
}
