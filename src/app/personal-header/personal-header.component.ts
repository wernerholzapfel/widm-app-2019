import {Component, OnDestroy, OnInit} from '@angular/core';
import {navigation} from '../constants/navigation.constants';
import {NavController} from '@ionic/angular';
import {IAppState} from '../store/store';
import {select, Store} from '@ngrx/store';
import {getDeelnemerScore} from '../store/poules/poules.reducer';
import {combineLatest, Observable, Subject} from 'rxjs';
import {UiService} from '../services/app/ui.service';
import {switchMap, take, takeUntil} from 'rxjs/operators';
import {KandidatenService} from '../services/api/kandidaten.service';
import {AuthService} from '../services/authentication/auth.service';

@Component({
    selector: 'app-personal-header',
    templateUrl: './personal-header.component.html',
    styleUrls: ['./personal-header.component.scss']
})
export class PersonalHeaderComponent implements OnInit, OnDestroy {
    unsubscribe: Subject<void> = new Subject<void>();
    deelnemer$: Observable<any>;
    mol: any;
    molPercentage: number;

    constructor(private navCtrl: NavController,
                private store: Store<IAppState>,
                private uiService: UiService,
                private authService: AuthService,
                private kandidatenService: KandidatenService
    ) {
    }

    goToVoorspelling() {
        this.navCtrl.navigateForward(`${navigation.home}/${navigation.voorspellen}`);
    }

    ngOnInit() {
        this.deelnemer$ = this.store.pipe(select(getDeelnemerScore));

        this.uiService.huidigeVoorspelling$.pipe(takeUntil(this.unsubscribe), switchMap(() => {
            return this.kandidatenService.getMolStatistieken().pipe(take(1));
        })).subscribe(statistieken => {
            this.uiService.statistieken$.next(statistieken);
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
    }
}
