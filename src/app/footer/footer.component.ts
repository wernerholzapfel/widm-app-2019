import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/authentication/auth.service';
import {navigation} from '../constants/navigation.constants';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getDisplayname} from '../store/poules/poules.reducer';
import {IAppState} from '../store/store';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

    displayName: string;
    unsubscribe: Subject<any> = new Subject();

    constructor(public authService: AuthService, private navCtrl: NavController, public router: Router, private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.store.pipe(select(getDisplayname), takeUntil(this.unsubscribe)).subscribe(displayName => {
            this.displayName = displayName;
        });
    }

    goToLogin() {
        this.navCtrl.navigateForward(`${navigation.home}`, {animated: true});
    }

    showIntro() {
        this.navCtrl.navigateForward(`${navigation.intro}`, {animated: true});
    }

    logout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.unsubscribe.next();
    }


}
