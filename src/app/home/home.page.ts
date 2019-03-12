import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/authentication/auth.service';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/store';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

    constructor(public authService: AuthService, private store: Store<IAppState>) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
