import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {navigation} from './constants/navigation.constants';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class IntroGuard implements CanActivate {

    constructor(public storage: Storage, public router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.storage.get('isIntroShown')
            .then(data => {
                    if (data) {
                        return true;
                    } else {
                        this.router.navigate([navigation.intro]);
                        return false;
                    }
                },
                error => {
                    console.error(error);
                    this.router.navigate([navigation.intro]);
                    return false;
                }
            );
    }
}
