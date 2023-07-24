import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  user = {};

  onFormSubmit = (e: any) => {
    e.preventDefault();
    // Logica per gestire l'invio del form
    console.log(this.user);
  }

}
