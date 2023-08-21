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
  ) {}

  ngOnInit() {
    this.subscription = this.authenticationService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        if (isLoggedIn) {
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
