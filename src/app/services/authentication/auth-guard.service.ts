import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class AuthGuardService {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate() {
    return this.authService.isLoggedIn().pipe(map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['']);
        return of(false);
      }));
  }
}
