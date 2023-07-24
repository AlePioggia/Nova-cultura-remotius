import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { AuthenticationRequest, IAuthenticationRequest } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  authenticationRequest: AuthenticationRequest = new AuthenticationRequest('', '');

  submitButtonOptions = {
    text: "Submit the Form",
    useSubmitBehavior: true
  }

  constructor(private authenticationService: AuthenticationService) {

  }

  onFormSubmit(e: any) {
    if (this.authenticationRequest) {
      this.authenticationService.logIn(this.authenticationRequest);
    }
  }

  setEmail(e: any) {
    this.authenticationRequest.email = e.value;
  }

  setPassword(e: any) {
    this.authenticationRequest.password = e.value;
  }

}