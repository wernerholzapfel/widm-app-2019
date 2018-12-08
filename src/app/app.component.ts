import {Component, OnDestroy, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FetchActiesInProgress} from './store/acties/acties.actions';
import {IAppState} from './store/store';
import {select, Store} from '@ngrx/store';
import {FetchPoulesInProgress} from './store/poules/poules.actions';
import {UitnodigingenService} from './services/api/uitnodigingen.service';
import {UiService} from './services/app/ui.service';
import {KandidatenService} from './services/api/kandidaten.service';
import {VoorspellenService} from './services/api/voorspellen.service';
import {AuthService} from './services/authentication/auth.service';
import {combineLatest, Subject} from 'rxjs';
import {getActies} from './store/acties/acties.reducer';
import {TestService} from './services/api/test.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    unsubscribe: Subject<void> = new Subject<void>();
    aflevering: number;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private store: Store<IAppState>,
        private uitnodigingenService: UitnodigingenService,
        private uiService: UiService,
        private kandidatenService: KandidatenService,
        private voorspellenService: VoorspellenService,
        private authService: AuthService,
        private testService: TestService
    ) {
        this.initializeApp();

    }

    ngOnInit() {
        this.platform.resume.subscribe(() => {
            this.store.dispatch(new FetchActiesInProgress());
        });

        this.store.dispatch(new FetchActiesInProgress());

        const acties$ = this.store.pipe(select(getActies));

        const aantalOnbeantwoordeVragen$ = this.testService.getaantalOnbeantwoordeVragen();

        this.authService.user$.subscribe(response =>  this.uiService.isLoading$.next(false));

        combineLatest(acties$, this.authService.user$,
            this.voorspellenService.getLaatsteVoorspelling(),
            aantalOnbeantwoordeVragen$)
            .subscribe(([acties, user, voorspelling, aantalOnbeantwoordeVragen]) => {
                if (acties && user) {
                    this.aflevering = acties.voorspellingaflevering ? acties.voorspellingaflevering : 1;
                    this.store.dispatch(new FetchPoulesInProgress());
                    this.uitnodigingenService.getUitnodigingen().subscribe(response => this.uiService.uitnodigingen$.next(response));
                    this.uiService.huidigeVoorspelling$
                        .next(Object.assign([], voorspelling,
                            {aflevering: acties.voorspellingaflevering ? acties.voorspellingaflevering : 1}));
                    this.uiService.voorspellingAfgerond$.next(voorspelling && acties.voorspellingaflevering === voorspelling.aflevering);
                    this.uiService.testAfgerond$.next(aantalOnbeantwoordeVragen.aantalOpenVragen === 0);
                    this.uiService.isLoading$.next(false);
                }
            });
        this.kandidatenService.getKandidaten().subscribe(response => this.uiService.kandidaten$.next(response));
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }
}
