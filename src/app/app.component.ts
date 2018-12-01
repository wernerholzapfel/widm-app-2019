import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FetchActiesInProgress} from './store/acties/acties.actions';
import {IAppState} from './store/store';
import {Store} from '@ngrx/store';
import {FetchPoulesInProgress} from './store/poules/poules.actions';
import {UitnodigingenService} from './services/api/uitnodigingen.service';
import {UiService} from './services/app/ui.service';
import {KandidatenService} from './services/api/kandidaten.service';
import {VoorspellenService} from './services/api/voorspellen.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private store: Store<IAppState>,
        private uitnodigingenService: UitnodigingenService,
        private uiService: UiService,
        private kandidatenService: KandidatenService,
        private voorspellenService: VoorspellenService,
    ) {
        this.initializeApp();
    }

    ngOnInit() {
        this.store.dispatch(new FetchActiesInProgress());
        this.store.dispatch(new FetchPoulesInProgress());

        this.uitnodigingenService.getUitnodigingen().subscribe(response => this.uiService.uitnodigingen$.next(response));
        this.voorspellenService.getVoorspellingen().subscribe(response => {
            this.uiService.huidigeVoorspelling$.next(
                Object.assign([], response[0].voorspelling,
                    {deelnemer: response[0].deelnemer},
                    {aflevering: response[0].aflevering}));
        });
        this.kandidatenService.getKandidaten().subscribe(response => this.uiService.kandidaten$.next(response));
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
