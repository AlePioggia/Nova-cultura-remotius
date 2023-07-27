import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  teacher = {
    name: 'Mario Rossi',
    bio: 'Sono un insegnante appassionato con 10 anni di esperienza',
    email: 'mario.rossi@gmail.com',
    subject: 'Matematica',
    imageUrl: 'assets/idiot.jpg'
  };

  constructor() { }

  ngOnInit(): void {
  }
}
