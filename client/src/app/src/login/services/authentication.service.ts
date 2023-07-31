import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ICreateUserRequest,
  CreateUserRequest,
} from './../../../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/constants';
import { IAuthenticationRequest } from 'src/app/interfaces/user.interface';
import { HelperService } from 'src/app/shared/services/service-helper.service';

export type Role = {
  id: number;
  role: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl: string = '';

  constructor(private helperService: HelperService, private http: HttpClient) {
    this.baseUrl = BASE_URL + 'users/';
  }

  async logIn(authenticationRequest: IAuthenticationRequest) {
    const response = await this.helperService.post(
      this.baseUrl + 'sign-user',
      authenticationRequest
    );
    sessionStorage.setItem('access_token', response['access_token']);
  }

  createUser(signInRequest: ICreateUserRequest) {
    this.helperService.post(this.baseUrl + 'create', signInRequest);
  }

  async getUserById(id: string) {
    const headers = new HttpHeaders({
      Authorization: sessionStorage.getItem('access_token'),
    });

    return this.http
      .get(`${this.baseUrl}single/${id}`, { headers: headers })
      .toPromise();
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
  }

  isTeacher(): boolean {
    const user: ICreateUserRequest = this.getUser(
      sessionStorage.getItem('access_token')
    );
    return user.roleId === 1;
  }

  private getUser(token: string) {
    return JSON.parse(atob(token.split('.')[1])) as ICreateUserRequest;
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
}
