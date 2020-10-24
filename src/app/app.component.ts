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
import {combineLatest, forkJoin, of, Subject} from 'rxjs';
import {getActies} from './store/acties/acties.reducer';
import {TestService} from './services/api/test.service';
import {concatMap, distinctUntilChanged, take, takeUntil} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {IActies} from './interface/IActies';
import {Storage} from '@ionic/storage';
import {FetchPoulesInProgress, ResetPoules} from './store/poules/poules.actions';
import {PoulesService} from './services/api/poules.service';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {CodePush, InstallMode} from '@ionic-native/code-push/ngx';

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
        private oneSignal: OneSignal,
        private storage: Storage,
        private testService: TestService,
        private codePush: CodePush,
    ) {
        this.initializeApp();

    }

    ngOnInit() {
        this.store.dispatch(new FetchActiesInProgress());

        this.store.pipe(select(getActies)).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            if (response && Object.entries(response).length > 0 && JSON.stringify(response) !== JSON.stringify(this.acties)) {
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
            if (this.platform.is('cordova')) {
                this.checkCodePush();
            }
        });

        this.storage.get('seizoen').then(seizoen => {
            if (seizoen !== '2020') {
                this.authService.logout();
            } else {
                console.log('heeft account');
            }
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

    fetchNewData(acties: IActies) {
        this.uiService.isSeasonFinished$.next(acties.isSeasonFinished);

        this.uiService.isLoading$.next(true);

        // while there is a user try to fetch all of his data and add it to uiservice.
        this.authService.user$.pipe(
            distinctUntilChanged())
            .pipe(
                concatMap(user => {
                    if (user) {
                        return combineLatest([
                            this.voorspellenService.getLaatsteVoorspelling().pipe(take(1)),
                            this.testService.getaantalOnbeantwoordeVragen().pipe(take(1)),
                            this.testService.gettests().pipe(take(1)),
                            this.voorspellenService.getAllVoorspellingen().pipe(take(1)),
                            // this.pouleService.getKlassement().pipe(take(1)),
                            this.uitnodigingenService.getUitnodigingen().pipe(take(1))]);
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
            .subscribe(([laatsteVoorspelling, onbeantwoordenvragen, testvragen, voorspellingen, uitnodigingen]) => {
                if (onbeantwoordenvragen && testvragen) { // todo andere kunnen null zijn indien 1e x.
                    this.store.dispatch(new FetchPoulesInProgress());

                    this.uiService.voorspellingen$.next(Object.assign([], voorspellingen));
                    this.uiService.huidigeVoorspelling$.next(Object.assign({}, laatsteVoorspelling));

                    this.uiService.voorspellingAfgerond$.next((laatsteVoorspelling &&
                        laatsteVoorspelling.afvaller &&
                        laatsteVoorspelling.winnaar &&
                        laatsteVoorspelling.mol &&
                        acties.voorspellingaflevering === laatsteVoorspelling.aflevering &&
                        !laatsteVoorspelling.mol.afgevallen) ||
                        acties.isSeasonFinished);

                    this.uiService.tests$.next(Object.assign([], testvragen));
                    this.uiService.testAfgerond$.next(onbeantwoordenvragen.aantalOpenVragen === 0 || acties.isSeasonFinished);

                    this.uiService.isLoading$.next(false);
                }
                if (uitnodigingen) {
                    this.uiService.uitnodigingen$.next(Object.assign([...uitnodigingen]));
                }
            });

        this.kandidatenService.getKandidaten().subscribe(response => this.uiService.kandidaten$.next([...response]));
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if (this.platform.is('cordova')) {
                this.setupPush();
                this.checkCodePush();
            }
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });

    }

    checkCodePush() {
        const downloadProgress = (progress) => {
            this.uiService.isLoading$.next(progress.receivedBytes !== progress.totalBytes);
            console.log(`Bezig met update, ${progress.receivedBytes} van ${progress.totalBytes} gedownload`);
        };

        this.codePush.sync({
            updateDialog: {
                appendReleaseDescription: false,
                updateTitle: 'Molloot update',
                mandatoryUpdateMessage: 'Er is een nieuwe update beschikbaar',
                mandatoryContinueButtonLabel: 'Installeer update'
            },
            deploymentKey: this.platform.is('ios') ? environment.iOSCodePush : environment.androidCodePush,
            installMode: InstallMode.IMMEDIATE
        }, downloadProgress).pipe(take(1)).subscribe(
            (syncStatus) => {
                console.log('CODE PUSH SYNCSTATUS: ' + syncStatus);
            },
            (error) => {
                console.error('CODE PUSH ERROR: ' + error);
            });
    }

    setupPush() {
        this.oneSignal.startInit(environment.oneSignal.appId, environment.oneSignal.googleProjectNumber);

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

        // Notifcation was received in general
        this.oneSignal.handleNotificationReceived().subscribe(data => {
            this.store.dispatch(new FetchActiesInProgress());
        });

        // Notification was really clicked/opened
        this.oneSignal.handleNotificationOpened().subscribe(data => {
            // Just a note that the data is a different place here!
        });

        this.oneSignal.endInit();
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
