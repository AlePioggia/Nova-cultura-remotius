import { AuthenticationService } from 'src/app/src/login/services/authentication.service';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationGuard {

    constructor(private authenticationService: AuthenticationService) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {
        return this.authenticationService.isUserLoggedIn();
    }
}
