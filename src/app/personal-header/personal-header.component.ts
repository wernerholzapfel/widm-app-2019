import {Component, OnDestroy, OnInit} from '@angular/core';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';
import {navigation} from '../constants/navigation.constants';
import {NavController} from '@ionic/angular';
import {IAppState} from '../store/store';
import {select, Store} from '@ngrx/store';
import {getDeelnemerScore} from '../store/poules/poules.reducer';
import {combineLatest, Observable, Subject} from 'rxjs';
import {UiService} from '../services/app/ui.service';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {KandidatenService} from '../services/api/kandidaten.service';

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
    options: NativeTransitionOptions = {
        direction: 'down',
        duration: 1000,
        slowdownfactor: -1,
        iosdelay: 100,
        androiddelay: 100,
        fixedPixelsTop: 60,
        fixedPixelsBottom: 0
    };

    constructor(private navCtrl: NavController,
                private nativePageTransitions: NativePageTransitions,
                private store: Store<IAppState>,
                private uiService: UiService,
                private kandidatenService: KandidatenService
    ) {
    }

    goToVoorspelling() {
        this.nativePageTransitions.slide(this.options);
        this.navCtrl.navigateForward(`${navigation.home}/${navigation.voorspellen}`);
    }

    ngOnInit() {
        this.deelnemer$ = this.store.pipe(select(getDeelnemerScore));

        combineLatest(this.uiService.statistieken$.pipe(distinctUntilChanged()),
            this.uiService.huidigeVoorspelling$.pipe(distinctUntilChanged()))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([statistieken, huidigevoorspelling]) => {
                if (huidigevoorspelling) {
                    this.mol = huidigevoorspelling ? huidigevoorspelling.mol : null;
                } else {
                    this.mol = null;
                    this.molPercentage = null;
                }
                if (huidigevoorspelling && statistieken && statistieken.data.find(item => item.mol.id === huidigevoorspelling.mol.id)) {
                    this.molPercentage = statistieken.data.find(item => item.mol.id === huidigevoorspelling.mol.id).percentage;
                } else if (huidigevoorspelling && huidigevoorspelling.mol && !huidigevoorspelling.mol.afgevallen && statistieken) {
                    this.kandidatenService.getMolStatistieken()
                        .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe))
                        .subscribe(newStats => {
                            this.uiService.statistieken$.next(Object.assign({}, newStats));
                    });
                }
            });

        this.uiService.huidigeVoorspelling$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            this.mol = response ? response.mol : null;
        });
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }
}
