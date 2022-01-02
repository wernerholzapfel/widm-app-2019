import {Component, OnDestroy, OnInit} from '@angular/core';
import {navigation} from '../constants/navigation.constants';
import {IAppState} from '../store/store';
import {select, Store} from '@ngrx/store';
import {getAllPoules, getDeelnemerId, getDeelnemerScore, getDisplayname} from '../store/poules/poules.reducer';
import {combineLatest, forkJoin, of, Subject} from 'rxjs';
import {UiService} from '../services/app/ui.service';
import {skipWhile, switchMap, take, takeUntil} from 'rxjs/operators';
import {KandidatenService} from '../services/api/kandidaten.service';
import {AuthService} from '../services/authentication/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-personal-header',
    templateUrl: './personal-header.component.html',
    styleUrls: ['./personal-header.component.scss']
})
export class PersonalHeaderComponent implements OnInit, OnDestroy {
    unsubscribe: Subject<void> = new Subject<void>();
    mol: any;
    molPercentage: number;
    deelnemerPunten: number;

    constructor(private router: Router,
                private store: Store<IAppState>,
                private uiService: UiService,
                public authService: AuthService,
                private kandidatenService: KandidatenService
    ) {
    }

    goToVoorspelling() {
        this.router.navigateByUrl(`${navigation.home}/${navigation.voorspellen}`);
    }

    goToStatistieken() {
        this.router.navigateByUrl(`${navigation.statistieken}`);
    }

    goToScores() {
        this.router.navigate(['punten']);
    }

    ngOnInit() {

        this.store.pipe(select(getDeelnemerScore))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(deelnemerPunten => {
                this.deelnemerPunten = deelnemerPunten;
            });

        this.uiService.huidigeVoorspelling$.pipe(
            takeUntil(this.unsubscribe),
            switchMap((huidigeVoorspelling) => {
            if (huidigeVoorspelling) {
                return this.kandidatenService.getMolStatistieken().pipe(take(1));
            } else {
                return of(null);
            }
        })).subscribe(statistieken => {
            if (statistieken) {
                this.uiService.statistieken$.next(statistieken);
            }
        });

        combineLatest(this.uiService.statistieken$,
            this.uiService.huidigeVoorspelling$)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([statistieken, huidigevoorspelling]) => {
                if (huidigevoorspelling) {
                    this.mol = huidigevoorspelling ? huidigevoorspelling.mol : null;
                } else {
                    this.mol = null;
                    this.molPercentage = null;
                }
                if (huidigevoorspelling &&
                    huidigevoorspelling.mol &&
                    statistieken &&
                    statistieken.data.find(item => item.mol.id === huidigevoorspelling.mol.id)) {
                    this.molPercentage = statistieken.data.find(item => item.mol.id === huidigevoorspelling.mol.id).percentage;
                }
            });

        this.uiService.huidigeVoorspelling$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            this.mol = response ? response.mol : null;
        });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
