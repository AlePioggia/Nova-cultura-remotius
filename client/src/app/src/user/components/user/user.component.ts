import { AuthenticationService } from './../../../login/services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CreateUserRequest,
  ICreateUserRequest,
} from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  teacher = {
    imageUrl: 'assets/idiot.jpg',
  };

  isTeacher: boolean;
  user: ICreateUserRequest;

  constructor(
    private routerService: Router,
    private authenticationService: AuthenticationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isTeacher = await this.authenticationService.isTeacher();
    const result = await this.authenticationService.getAllUserInformations();
    console.log(result);
    this.user = result;
  }

  addLesson() {
    this.routerService.navigate(['../lesson']);
  }
}
