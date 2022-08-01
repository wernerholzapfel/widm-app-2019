import {Component, OnDestroy, OnInit} from '@angular/core';
import {navigation} from '../constants/navigation.constants';
import {AuthService} from '../services/authentication/auth.service';
import {UiService} from '../services/app/ui.service';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {getActies} from '../store/acties/acties.reducer';
import {IAppState} from '../store/store';
import {select, Store} from '@ngrx/store';
import {FetchActiesInProgress} from '../store/acties/acties.actions';
import {Router} from '@angular/router';
import {IActies} from '../interface/IActies';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit, OnDestroy {
    unsubscribe: Subject<any> = new Subject();

    testAfgerond: boolean;
    voorspellingAfgerond: boolean;
    acties: IActies;
    cardText: string;
    uitnodigingen: any[];

    constructor(private router: Router,
                public authService: AuthService,
                public uiService: UiService,
                private store: Store<IAppState>) {
    }

    ngOnInit() {

        const testAfgerond$ = this.uiService.testAfgerond$;
        const voorspellingAfgerond$ = this.uiService.voorspellingAfgerond$;
        const acties$ = this.store.pipe(select(getActies));

        combineLatest([testAfgerond$, voorspellingAfgerond$, acties$]).pipe(takeUntil(this.unsubscribe))
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
        if (this.acties && !this.acties.isSeasonFinished) {
            if (this.testAfgerond && this.voorspellingAfgerond) {
                return 'Je bent helemaal bij.';
            }
            if (this.testAfgerond && !this.voorspellingAfgerond) {
                return 'Vergeet niet je voorspellingen te doen. Dit kan nog tot ' +
                    this.formatDate(this.acties.voorspellingDeadlineDatetime);
            }
            if (!this.testAfgerond && this.voorspellingAfgerond) {
                return 'Vergeet niet de test te maken. Dit kan nog tot ' +
                    this.formatDate(this.acties.testDeadlineDatetime);
            }
            if (!this.testAfgerond && !this.voorspellingAfgerond) {
                return 'Vergeet niet de test en je voorspellingen in te vullen. Dit kan nog tot ' +
                    this.formatDate(this.acties.testDeadlineDatetime);
            } else {
                return 'bezig met laden van gegevens';
            }
        } else if (this.acties && this.acties.isSeasonFinished) {
            return 'Het Wie is de Mol seizoen zit erop. Bedankt voor het meespelen!';
        }
    }


    formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('nl-NL', {});

    }

    goToTest() {
        this.router.navigate([`${navigation.test}`]);
    }

    goToDisclaimer() {
        this.router.navigate([`${navigation.punten}`]);
    }

    goToVoorspellen() {
        this.router.navigate([`${navigation.voorspellen}`]);
    }

    goToPoules() {
        this.router.navigate([`${navigation.poules}/${navigation.overview}`]);
    }

    ngOnDestroy() {
        this.unsubscribe.next(undefined);
        this.unsubscribe.complete();
    }

    fetchActies() {
        this.store.dispatch(new FetchActiesInProgress());
    }

}
