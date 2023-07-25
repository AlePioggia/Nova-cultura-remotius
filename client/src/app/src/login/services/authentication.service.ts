import { ICreateUserRequest, CreateUserRequest } from './../../../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/constants';
import { IAuthenticationRequest } from 'src/app/interfaces/user.interface';
import { HelperService } from 'src/app/shared/services/service-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = "";

  constructor(private helperService: HelperService) {
    this.baseUrl = BASE_URL + "users/"
  }

  logIn(authenticationRequest: IAuthenticationRequest) {
    this.helperService.post(this.baseUrl + "sign-user", authenticationRequest);
  }

  createUser(signInRequest: ICreateUserRequest) {
    this.helperService.post(this.baseUrl + "create", signInRequest)
  }

}
