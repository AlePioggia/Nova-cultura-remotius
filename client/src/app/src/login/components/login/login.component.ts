import { AuthenticationService } from './../../services/authentication.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationRequest,
  IAuthenticationRequest,
} from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  passwordVisible: boolean = false;

  // Riferimento al dx-text-box
  @ViewChild('passwordBox') passwordBox;
  @ViewChild('form') form: any;

  authenticationRequest: IAuthenticationRequest = new AuthenticationRequest();

  submitButtonOptions = {
    text: 'Submit the Form',
    useSubmitBehavior: true,
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onFormSubmit(e: any) {
    try {
      if (this.form && !this.form.instance.validate().isValid) {
        return;
      } else if (this.form && this.form.instance.validate().isValid) {
        this.authenticationService.logIn(this.authenticationRequest);
        this.router.navigate(['/home']);
      }
    } catch (error) {
      throw error;
    }
  }

  // Definizione del pulsante
  passwordButton = {
    icon: 'fa fa-eye',
    type: 'default',
    onClick: () => this.togglePasswordVisibility(),
  };

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordButton.icon = this.passwordVisible
      ? 'fa fa-eye-slash'
      : 'fa fa-eye';
  }
}
