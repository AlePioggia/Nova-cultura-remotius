import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateUserRequest } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() data: ICreateUserRequest[];
  imageUrl: string = 'assets/idiot.jpg';

  constructor(private routerService: Router) {}

  openChat() {
    console.log('Functionality not yet implemented');
  }

  makeReservation(itemData: any) {
    console.log(itemData);
    this.routerService.navigate(['../lesson/planner']);
  }
}
