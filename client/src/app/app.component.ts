import { Component } from '@angular/core';
import { AuthenticationService } from './src/login/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  constructor(private authenticationService: AuthenticationService) {}

  isAuthenticated() {
    return this.authenticationService.isUserLoggedIn();
  }
}
