import { Component, Input } from '@angular/core';
import { ICreateUserRequest } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() data: ICreateUserRequest[];
  imageUrl: string = 'assets/idiot.jpg';

  openChat() {
    console.log('Functionality not yet implemented');
  }

  makeReservation() {
    console.log('Functionality not yet implemented');
  }
}
