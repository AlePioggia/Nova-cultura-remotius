import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: any;

  onFormSubmit = (e: any) => {
    e.preventDefault();
    // Logica per gestire l'invio del form
    console.log(this.login);
  }

}
