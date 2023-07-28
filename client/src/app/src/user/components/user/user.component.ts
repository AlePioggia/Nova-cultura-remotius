import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private routerService: Router) {}

  ngOnInit(): void {}

  addLesson() {
    this.routerService.navigate(['../lesson']);
  }
}
