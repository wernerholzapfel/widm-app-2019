import {Component, OnDestroy, OnInit} from '@angular/core';
import {navigation} from '../constants/navigation.constants';
import {NavController} from '@ionic/angular';
import {AuthService} from '../services/authentication/auth.service';
import {UiService} from '../services/app/ui.service';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {getActies} from '../store/acties/acties.reducer';
import {IAppState} from '../store/store';
import {select, Store} from '@ngrx/store';
import {FetchActiesInProgress} from '../store/acties/acties.actions';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit, OnDestroy {
    unsubscribe: Subject<any> = new Subject();

    voorspellingBekend = false;
    slideOpts = {
        autoplay: false,
        slidesPerView: 1.1,
        spaceBetween: 10,
        effect: 'flip'
    };

    testAfgerond: boolean;
    voorspellingAfgerond: boolean;
    acties: any;
    cardText: string;

    constructor(private navCtrl: NavController,
                public authService: AuthService,
                public uiService: UiService,
                private store: Store<IAppState>) {
    }

    ngOnInit() {

        const testAfgerond$ = this.uiService.testAfgerond$;
        const voorspellingAfgerond$ = this.uiService.voorspellingAfgerond$;
        const acties$ = this.store.pipe(select(getActies));

        combineLatest(testAfgerond$, voorspellingAfgerond$, acties$).pipe(takeUntil(this.unsubscribe))
            .subscribe(([testAfgerond, voorspellingAfgerond, acties]) => {
                if (testAfgerond !== undefined && voorspellingAfgerond !== undefined && acties) {
                    this.testAfgerond = testAfgerond;
                    this.voorspellingAfgerond = voorspellingAfgerond;
                    this.acties = acties;

                    this.cardText = this.cardTextFunc();
                }
            });
    }

    cardTextFunc(): string {
        if (this.acties) {
            if (this.testAfgerond && this.voorspellingAfgerond) {
                return 'Je bent helemaal bij, je kan je voorspellingen nog wijzigen tot ' +
                    this.formatDate(this.acties.voorspellingDeadlineDatetime);
            }
            if (this.testAfgerond && !this.voorspellingAfgerond) {
                return 'Vergeet niet je voorspellingen op te slaan dit kan nog tot ' +
                    this.formatDate(this.acties.voorspellingDeadlineDatetime);
            }
            if (!this.testAfgerond && this.voorspellingAfgerond) {
                return 'Vergeet niet de test te maken! dit kan nog tot ' +
                    this.formatDate(this.acties.testDeadlineDatetime);
            }
            if (!this.testAfgerond && !this.voorspellingAfgerond) {
                return 'Vergeet niet je test en voorspellingen in te vullen, dit kan nog tot ' +
                    this.formatDate(this.acties.testDeadlineDatetime);
            } else {
                return 'bezig met laden van gegevens';
            }
        }
    }


    formatDate(dateString: string): string {
        const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        return new Date(dateString).toLocaleDateString('nl-NL', options);

    }

    goToTest() {
        this.navCtrl.navigateForward(`${navigation.test}`);
    }

    goToDisclaimer() {
        this.navCtrl.navigateForward(`${navigation.punten}`);
    }

    goToVoorspellen() {
        this.navCtrl.navigateForward(`${navigation.voorspellen}`);
    }

    goToPoules() {
        this.navCtrl.navigateForward(`${navigation.poules}/${navigation.poule}`);
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }

    fetchACties() {
        this.store.dispatch(new FetchActiesInProgress());
    }

}
