import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from as fromPromise, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.authService.isLoggedIn()
            .pipe(switchMap((value) => {
                if (value) {
                    return fromPromise(this.authService.getToken())
                        .pipe(switchMap(token => {
                            if (token) {
                                request = request.clone({
                                    setHeaders: {
                                        'Content-Type': 'application/json',
                                        'Cache-Control': 'no-cache',
                                        'Pragma': 'no-cache',
                                        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
                                        'Authorization': `Bearer ${token}`
                                    }
                                });
                                return this.handleUnAuthorized(next, request);
                            } else {
                                return next.handle(request);
                            }
                        }));
                } else {
                    request = request.clone({
                        setHeaders: {
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache',
                            'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    });
                    return this.handleUnAuthorized(next, request);
                }
            }));
    }

    handleUnAuthorized(next: HttpHandler, request: HttpRequest<any>): Observable<HttpEvent<any>> {
        if (request.url.startsWith(environment.api)) {
            return next.handle(request).pipe(tap(() => {
                },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status !== 401) {
                            return;
                        }
                        this.authService.logout();
                        this.router.navigate(['home']);
                    }
                }));
        } else {
            return next.handle(request);
        }

    }
}
