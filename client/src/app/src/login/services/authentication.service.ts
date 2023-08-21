import { ToastService } from './../../../shared/services/toast.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ICreateUserRequest,
  CreateUserRequest,
} from './../../../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/constants';
import { IAuthenticationRequest } from 'src/app/interfaces/user.interface';
import { HelperService } from 'src/app/shared/services/service-helper.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  throwError,
} from 'rxjs';

export type Role = {
  id: number;
  role: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedInStatus = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  public isLoggedIn$ = this.loggedInStatus.asObservable();

  baseUrl: string = '';
  private _isPippo = new BehaviorSubject<boolean>(false);

  isPippo$ = this._isPippo.asObservable();

  constructor(
    private helperService: HelperService,
    private http: HttpClient,
    private toastService: ToastService
  ) {
    this.baseUrl = BASE_URL + 'users/';
    const isPippo = sessionStorage.getItem('isTeacher') === '1';
    this._isPippo.next(isPippo);
  }

  async logIn(authenticationRequest: IAuthenticationRequest) {
    try {
      const response = await this.helperService.post(
        this.baseUrl + 'sign-user',
        authenticationRequest
      );
      sessionStorage.setItem('access_token', response['access_token']);
      const data = this.getUser(response['access_token']);
      const user: ICreateUserRequest = await this.getUserById(data.sub);
      await sessionStorage.setItem('isTeacher', user.roleId.toString());
      this.toastService.showSuccess('Accesso avvenuto con successo!');
      this.loggedInStatus.next(true);
      // Aspetta 3 secondi (o il tempo desiderato) prima di ricaricare la pagina
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      this.toastService.showError('Credenziali errate');
    }
  }

  async getTeachers(): Promise<any> {
    return this.http.get(`${this.baseUrl}teachers`).toPromise();
  }

  async getStudents(): Promise<any> {
    return this.http.get(`${this.baseUrl}students`).toPromise();
  }

  async createUser(signInRequest: ICreateUserRequest) {
    this.helperService.post(this.baseUrl + 'create', signInRequest);
  }

  async getUserById(id: string): Promise<any> {
    return this.http.get(`${this.baseUrl}single/${id}`).toPromise();
  }

  //metodo statico
  getRoles() {
    const roles: Role[] = [
      { id: 0, role: 'student' },
      { id: 1, role: 'teacher' },
    ];
    return roles;
  }

  logOut() {
    sessionStorage.removeItem('access_token');
    this.loggedInStatus.next(false);
  }

  async isTeacher(): Promise<boolean> {
    const data: any = this.getUser(sessionStorage.getItem('access_token'));
    const user: ICreateUserRequest = await this.getUserById(data.sub);
    return user.roleId === 1;
  }

  private getUser(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  async getAllUserInformations(): Promise<any> {
    const token = sessionStorage.getItem('access_token');
    const userId = JSON.parse(atob(token.split('.')[1])).sub ?? '';
    return userId ? await this.getUserById(userId) : null;
  }

  async getUserByEmail(email: string) {
    await this.helperService.get(this.baseUrl + `email/${email}`);
  }

  isUserLoggedIn(): boolean {
    return sessionStorage.getItem('access_token') !== null;
  }

  async isTeacherToken(): Promise<boolean> {
    const user: any = await this.getAllUserInformations();
    return this.isUserLoggedIn ? user.roleId === '1' : false;
  }
}
