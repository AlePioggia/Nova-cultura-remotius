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
    name: 'Mario Rossi',
    bio: 'Sono un insegnante appassionato con 10 anni di esperienza',
    email: 'mario.rossi@gmail.com',
    subject: 'Matematica',
    imageUrl: 'assets/idiot.jpg',
  };

  user: ICreateUserRequest;

  constructor(
    private routerService: Router,
    private authenticationService: AuthenticationService
  ) {}

  async ngOnInit(): Promise<void> {
    const result = await this.authenticationService.getAllUserInformations();
    this.user = result;
    console.log(this.user);
  }

  addLesson() {
    this.routerService.navigate(['../lesson']);
  }
}
