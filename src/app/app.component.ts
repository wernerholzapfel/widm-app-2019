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
import {PoulesService} from './services/api/poules.service';

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
        private pouleService: PoulesService,
        private testService: TestService
    ) {
        this.initializeApp();

    }

    ngOnInit() {
        this.store.dispatch(new FetchActiesInProgress());

        this.store.pipe(select(getActies)).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            if (response && JSON.stringify(response) !== JSON.stringify(this.acties)) {
                console.log('nieuwe acties beschikbaar');
                this.aflevering = response.voorspellingaflevering ? response.voorspellingaflevering : 1;

                this.acties = response;
                this.fetchNewData(response);
            } else if (response && response.alwaysUpdate) {
                this.fetchUitnodigingen();
            }
        });

        this.platform.resume.subscribe(() => {
            this.store.dispatch(new FetchActiesInProgress());
        });

    }


    fetchUitnodigingen() {
        this.authService.user$.pipe(
            distinctUntilChanged())
            .pipe(
                concatMap(user => {
                    if (user) {
                        this.store.dispatch(new FetchPoulesInProgress());
                        return forkJoin(this.uitnodigingenService.getUitnodigingen().pipe(take(1)),
                            this.kandidatenService.getMolStatistieken().pipe(take(1)));
                    } else {
                        return of([null, null]);
                    }
                }),
                takeUntil(this.unsubscribe))
            .subscribe(([uitnodigingen, statistieken]) => {
                if (uitnodigingen && statistieken) {
                    this.uiService.uitnodigingen$.next(Object.assign([...uitnodigingen]));
                    this.uiService.statistieken$.next(Object.assign({}, statistieken));
                }
            });
    }

    fetchNewData(acties) {
        this.uiService.isLoading$.next(true);

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
                            this.voorspellenService.getAllVoorspellingen().pipe(take(1)),
                            this.pouleService.getKlassement().pipe(take(1)),
                            this.uitnodigingenService.getUitnodigingen().pipe(take(1)));
                    } else {
                        this.store.dispatch(new ResetPoules());
                        this.uiService.huidigeVoorspelling$.next(null);
                        this.uiService.tests$.next(null);

                        this.uiService.testAfgerond$.next(undefined);
                        this.uiService.voorspellingAfgerond$.next(undefined);

                        this.uiService.isLoading$.next(false);
                        return of([null, null, null, null, null]);
                    }
                }),
                takeUntil(this.unsubscribe))
            .subscribe(([laatsteVoorspelling, onbeantwoordenvragen, testvragen, voorspellingen, stand, uitnodigingen]) => {
                if (onbeantwoordenvragen && testvragen && stand) { // todo andere kunnen null zijn indien 1e x.
                    this.store.dispatch(new FetchPoulesInProgress());

                    this.uiService.voorspellingen$.next(Object.assign([], voorspellingen));
                    this.uiService.huidigeVoorspelling$.next(Object.assign({}, laatsteVoorspelling));

                    this.uiService.voorspellingAfgerond$.next(laatsteVoorspelling &&
                        laatsteVoorspelling.afvaller &&
                        laatsteVoorspelling.winnaar &&
                        laatsteVoorspelling.mol &&
                        acties.voorspellingaflevering === laatsteVoorspelling.aflevering &&
                        !laatsteVoorspelling.mol.afgevallen);

                    this.uiService.tests$.next(Object.assign([], testvragen));
                    this.uiService.testAfgerond$.next(onbeantwoordenvragen.aantalOpenVragen === 0);

                    this.uiService.isLoading$.next(false);
                    if (stand.data.length > 0) {
                        this.uiService.poules$.next([{id: 0, poule_name: 'Algemene stand', deelnemers: stand.data, admins: []},
                            ...this.uiService.poules$.getValue()]);
                        this.uiService.activePouleIndex$.next(0);
                    }
                }
                if (uitnodigingen) {
                    this.uiService.uitnodigingen$.next(Object.assign([...uitnodigingen]));
                }
            });

        this.kandidatenService.getKandidaten().subscribe(response => this.uiService.kandidaten$.next([...response]));
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
