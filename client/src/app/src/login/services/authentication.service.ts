import { Injectable } from '@angular/core';
import { IAuthenticationRequest } from 'src/app/interfaces/user.interface';
import { HelperService } from 'src/app/services/service-helper/service-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = "";

  constructor(private helperService: HelperService) {
    this.baseUrl = "http://localhost:3000/users/"
  }

  logIn(authenticationRequest: IAuthenticationRequest) {
    this.helperService.post(this.baseUrl + "sign-user", authenticationRequest);
  }

}
