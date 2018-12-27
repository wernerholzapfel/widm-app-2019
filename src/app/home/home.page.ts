import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../services/authentication/auth.service';
import {select, Store} from '@ngrx/store';
import {getDeelnemer} from '../store/poules/poules.reducer';
import {Observable} from 'rxjs';
import {IAppState} from '../store/store';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    deelnemer$: Observable<any>;

    constructor(private navCtrl: NavController, public authService: AuthService, private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.deelnemer$ = this.store.pipe(select(getDeelnemer));
    }
}
