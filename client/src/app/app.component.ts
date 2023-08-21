import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from './src/login/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';

  private subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    sessionStorage.setItem('isTeacher', '0');
  }

  ngOnInit() {
    this.subscription = this.authenticationService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        if (isLoggedIn) {
          // Reindirizza l'utente a una pagina dopo l'autenticazione, ad esempio la dashboard
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['']);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isAuthenticated() {
    return this.authenticationService.isUserLoggedIn();
  }

  isTeacher() {
    return this.authenticationService.isTeacher();
  }
}
