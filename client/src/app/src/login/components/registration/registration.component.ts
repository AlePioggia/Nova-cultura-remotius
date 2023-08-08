import {
  AuthenticationService,
  Role,
} from './../../services/authentication.service';
import { Component, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import {
  CreateUserRequest,
  ICreateUserRequest,
} from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;

  roles: Role[] = this.authenticationService.getRoles();

  createUserRequest: ICreateUserRequest = new CreateUserRequest();

  constructor(private authenticationService: AuthenticationService) {}

  onFormSubmit = (e: any) => {
    if (this.form.instance.validate().isValid) {
      this.authenticationService.createUser(this.createUserRequest);
    }
  };
}
