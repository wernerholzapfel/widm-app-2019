import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../store/store';
import {getDeelnemer} from '../store/poules/poules.reducer';
import {Observable, Subject} from 'rxjs';
import {IPoule} from '../interface/IPoules';
import {Router} from '@angular/router';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {UiService} from '../services/app/ui.service';
import {navigation} from '../constants/navigation.constants';
import {IUitnodigingResponse} from '../services/api/uitnodigingen.service';
import {PoulesService} from '../services/api/poules.service';
import {CalculatieService} from '../calculatie.service';

@Component({
    selector: 'app-poules',
    templateUrl: './poules.component.html',
    styleUrls: ['./poules.component.scss']
})
export class PoulesComponent implements OnInit, OnDestroy {

    deelnemer$: Observable<any>;
    unsubscribe = new Subject<void>();
    poules: any[] = [];
    positie: number;
    deelnemerId: string;
    activePouleIndex: number;
    numberOfPoules = 0;
    poule_name: string;
    uitnodigingen: IUitnodigingResponse[];
    klassement: IPoule;

    constructor(private store: Store<IAppState>,
                public router: Router,
                private uiService: UiService,
                private pouleService: PoulesService,
                private calculatieService: CalculatieService) {
    }

    ngOnInit() {
        this.deelnemer$ = this.store.pipe(select(getDeelnemer));

        this.uiService.poules$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            if (response) {
                this.klassement = response.find(poule => {
                    return poule.id === 0;
                });
                this.numberOfPoules = response.length;
                this.poules = response;
            }
        });

        this.uiService.activePouleIndex$.pipe(distinctUntilChanged(), takeUntil(this.unsubscribe)).subscribe(response => {
            if (response !== null) {
                this.activePouleIndex = response;
                this.activatePoule(response);
            }
        });

        this.uiService.uitnodigingen$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            this.uitnodigingen = response;
        });

        this.deelnemer$.pipe(takeUntil(this.unsubscribe))
            .subscribe(deelnemer => {
                if (deelnemer && deelnemer.id) {
                    this.deelnemerId = deelnemer.id;
                    if (deelnemer.poules.length > 0) {
                        const eigenKlassement = deelnemer.poules.reduce((accumulator, currentValue) => {
                            return [...currentValue.deelnemers, ...accumulator];
                        }, []);
                        if (deelnemer.poules.length > 0) {
                            this.uiService.poules$.next([
                                {
                                    ...this.klassement,
                                    deelnemers: this.klassement.deelnemers // todo aantal bepalen
                                },
                                {
                                    poule_name: 'Persoonlijke stand',
                                    deelnemers: this.transformDeelnemers(eigenKlassement),
                                    admins: []
                                },
                                ...deelnemer.poules]);
                        } else {
                            this.uiService.poules$.next([
                                {
                                    ...this.klassement,
                                    deelnemers: this.klassement.deelnemers // todo aantal bepalen
                                }]);
                        }

                        this.uiService.activePouleIndex$.next(0);
                    }
                }
            });
    }

    transformDeelnemers(arr) {
        // remove duplicates // sort list // add position
        const s: Set<any> = new Set(arr);
        const verwerkteDeelnemers: Set<string> = new Set();
        const nieuweLijst = new Set();
        s.forEach(deelnemer => {
            if (!verwerkteDeelnemers.has(deelnemer.id)) {
                verwerkteDeelnemers.add(deelnemer.id);
                nieuweLijst.add(deelnemer);
            }
        });
        const it = nieuweLijst.values();
        const nieuweDeelnemersLijst = Array.from(it);
        return nieuweDeelnemersLijst
            .sort((a, b) => b.totaalpunten - a.totaalpunten)
            .map((deelnemer, index, deelnemers) => Object.assign(deelnemer, {
                positie: this.calculatieService.calculatePosition(deelnemer, index, deelnemers)
            }));
    }

    activatePoule(newPouleIndex) {
        this.activePouleIndex = newPouleIndex;
        this.uiService.activePoule$.next(this.poules[this.activePouleIndex]);
        if (this.deelnemerId) {
            this.positie = this.poules[this.activePouleIndex].deelnemers.find(d => d.id === this.deelnemerId).positie;
        } else {
            this.positie = 0;
        }

        this.poule_name = this.poules[this.activePouleIndex].poule_name;
    }

    goToAcceptInvite() {
        this.router.navigateByUrl(`${navigation.poules}/${navigation.acceptinvite}`);
    }

    ngOnDestroy() {
        this.unsubscribe.next();
    }
}
