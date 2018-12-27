import {Component, OnDestroy, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FetchActiesInProgress} from './store/acties/acties.actions';
import {IAppState} from './store/store';
import {select, Store} from '@ngrx/store';
import {UitnodigingenService} from './services/api/uitnodigingen.service';
import {UiService} from './services/app/ui.service';
import {KandidatenService} from './services/api/kandidaten.service';
import {VoorspellenService} from './services/api/voorspellen.service';
import {AuthService} from './services/authentication/auth.service';
import {forkJoin, of, Subject} from 'rxjs';
import {getActies} from './store/acties/acties.reducer';
import {TestService} from './services/api/test.service';
import {concatMap, distinctUntilChanged, take, takeUntil} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {IActies} from './interface/IActies';
import {FetchPoulesInProgress, ResetPoules} from './store/poules/poules.actions';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    unsubscribe: Subject<void> = new Subject<void>();
    aflevering: number;
    acties: IActies;

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
        this.authService.user$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            console.log('user gewijzigd');
            this.uiService.isLoading$.next(false);
        });

        this.store.dispatch(new FetchActiesInProgress());

        this.store.pipe(select(getActies)).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            if (response && JSON.stringify(response) !== JSON.stringify(this.acties)) {
                console.log('nieuwe acties beschikbaar');
                this.aflevering = response.voorspellingaflevering ? response.voorspellingaflevering : 1;

                this.acties = response;
                this.fetchNewData(response);
            }
        });

        this.platform.resume.subscribe(() => {
            this.store.dispatch(new FetchActiesInProgress());
            this.uitnodigingenService.getUitnodigingen().pipe(take(1))
                .subscribe(response => this.uiService.uitnodigingen$.next(Object.assign([...response])));
        });

    }

    fetchNewData(acties) {
        // this.uiService.isLoading$.next(true);

        // while there is a user try to fetch all of his data and add it to uiservice.

        this.authService.user$.pipe(
            distinctUntilChanged())
            .pipe(
                concatMap(user => {
                    if (user) {
                        return forkJoin(
                            this.voorspellenService.getLaatsteVoorspelling().pipe(take(1)),
                            this.testService.getaantalOnbeantwoordeVragen().pipe(take(1)),
                            this.testService.gettests().pipe(take(1)),
                            this.voorspellenService.getAllVoorspellingen().pipe(take(1)));
                    } else {
                        this.store.dispatch(new ResetPoules());
                        this.uiService.huidigeVoorspelling$.next(null);
                        this.uiService.tests$.next(null);

                        this.uiService.testAfgerond$.next(true);
                        this.uiService.voorspellingAfgerond$.next(true);

                        this.uiService.isLoading$.next(false);
                        return of([null, null, null, null]);
                    }
                }),
                takeUntil(this.unsubscribe)).subscribe(([laatsteVoorspelling, onbeantwoordenvragen, testvragen, voorspellingen]) => {
            if (onbeantwoordenvragen && testvragen) { // todo andere kunnen null zijn indien 1e x.
                this.store.dispatch(new FetchPoulesInProgress());

                this.uiService.voorspellingen$.next(Object.assign([], voorspellingen));
                this.uiService.huidigeVoorspelling$.next(Object.assign({}, laatsteVoorspelling));

                this.uiService.voorspellingAfgerond$.next(
                    laatsteVoorspelling && acties.voorspellingaflevering ===
                    laatsteVoorspelling.aflevering && !laatsteVoorspelling.mol.afgevallen);

                this.uiService.tests$.next(Object.assign([], testvragen));
                this.uiService.testAfgerond$.next(onbeantwoordenvragen.aantalOpenVragen === 0);

                this.uiService.isLoading$.next(false);
            }
        });

        this.kandidatenService.getKandidaten().subscribe(response => this.uiService.kandidaten$.next([...response]));


        this.kandidatenService.getMolStatistieken().pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            this.uiService.statistieken$.next(Object.assign({}, response));
        });

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleLightContent();
            this.splashScreen.hide();

            // OneSignal Code start:
            // Enable to debug issues:
            // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

            const notificationOpenedCallback = function (jsonData) {
                console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
            };

            const handleNotificationReceived = function (jsonData) {
                console.log('notificationReceived: ' + JSON.stringify(jsonData));
                this.store.dispatch(new FetchActiesInProgress());
            };

            if (environment.production) {
                window['plugins'].OneSignal
                    .startInit('c9e91d07-f6c6-480b-a9ac-8322418085f8', 'molloot-8de9b')
                    .handleNotificationOpened(notificationOpenedCallback)
                    .handleNotificationReceived(handleNotificationReceived)
                    .endInit();
            }
        });

    }

    ngOnDestroy() {
        this.unsubscribe.next();
    }
}
