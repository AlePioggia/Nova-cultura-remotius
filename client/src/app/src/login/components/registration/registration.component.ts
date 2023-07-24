import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { CreateUserRequest } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  user = {};

  createUserRequest: CreateUserRequest = new CreateUserRequest("", "", "", 0, "", "");

  constructor(private authenticationService: AuthenticationService) {
  }

  onFormSubmit = (e: any) => {
    if (this.createUserRequest) {
      this.authenticationService.createUser(this.createUserRequest);
    }
  }

  setEmail(e: any) {
    this.createUserRequest.email = e.value;
  }

  setFirstName(e: any) {
    this.createUserRequest.firstName = e.value;
  }

  setLastName(e: any) {
    this.createUserRequest.lastName = e.value;
  }

  setAge(e: any) {
    this.createUserRequest.age = +e.value;
  }

  setAddress(e: any) {
    this.createUserRequest.address = e.value;
  }

  setPassword(e: any) {
    this.createUserRequest.password = e.value;
  }

}
