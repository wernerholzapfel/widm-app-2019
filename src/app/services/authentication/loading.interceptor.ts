import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {UiService} from '../app/ui.service';
import {Observable} from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    constructor(private loaderService: UiService) { }
    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading$.next(this.requests.length > 0);
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(req);
        this.loaderService.isLoading$.next(true);
        // We create a new observable which we return instead of the original
        return new Observable(observer => {
            // And subscribe to the original observable to ensure the HttpRequest is made
            const subscription = next.handle(req)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                        }
                    },
                    err => { this.removeRequest(req); observer.error(err); },
                    () => { this.removeRequest(req); observer.complete(); });
            // return teardown logic in case of cancelled requests
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
}
