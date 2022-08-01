import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../store/store';
import {getActivePoule, getAllPoules, getDeelnemerId, getPositionInActivePoule} from '../store/poules/poules.reducer';
import {combineLatest, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {UiService} from '../services/app/ui.service';
import {navigation} from '../constants/navigation.constants';
import {IUitnodigingResponse} from '../services/api/uitnodigingen.service';
import {PoulesService} from '../services/api/poules.service';
import {CalculatieService} from '../calculatie.service';
import {SetPouleActive} from '../store/poules/poules.actions';
import {PouleHelperService} from '../poule-helper.service';

@Component({
    selector: 'app-poules',
    templateUrl: './poules.component.html',
    styleUrls: ['./poules.component.scss']
})
export class PoulesComponent implements OnInit, OnDestroy {

    unsubscribe = new Subject<void>();
    poules: any[] = [];
    positie: number;
    deelnemerId: string;
    activePouleIndex: number;
    numberOfPoules = 0;
    poule_name: string;
    uitnodigingen: IUitnodigingResponse[];

    constructor(private store: Store<IAppState>,
                public router: Router,
                private uiService: UiService,
                private pouleService: PoulesService,
                private calculatieService: CalculatieService,
                private pouleHelper: PouleHelperService) {
    }

    ngOnInit() {

        combineLatest([
            this.store.pipe(select(getDeelnemerId)),
            this.store.pipe(select(getAllPoules)),
            this.store.pipe(select(getActivePoule))])
            .pipe(takeUntil(this.unsubscribe)).subscribe(([deelnemerId, poules, activePoule]) => {
            if (deelnemerId && poules && activePoule) {
                this.deelnemerId = deelnemerId;
                this.poules = poules;
                this.numberOfPoules = this.poules.length;
                this.activePouleIndex = this.poules.findIndex(p => p.id === activePoule.id);
            }
        });

        // this.uiService.uitnodigingen$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
        //     this.uitnodigingen = response;
        // });

        this.store.pipe(select(getPositionInActivePoule))
            .pipe(takeUntil(this.unsubscribe)).subscribe((positie) => {
            this.positie = positie;
        });

    }

    determineDeelnemers(deelnemers: any[], deelnemerId: string) {
        const top25 = deelnemers.slice(0, 25);
        if (top25.find(item => item.id === deelnemerId)) {
            return top25;
        } else {
            return [...top25, deelnemers.find(item => item.id === deelnemerId)];
        }
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
        const nieuweDeelnemersLijst: any[] = Array.from(it);
        return nieuweDeelnemersLijst
            .sort((a, b) => b.totaalpunten - a.totaalpunten)
            .reduce((accumulator, currentValue, index) => {
                return [...accumulator, Object.assign({}, currentValue, {
                    positie: this.calculatieService.calculatePosition(currentValue, index, accumulator)
                })];
            }, []);
    }

    activatePoule(newPouleIndex) {
        this.activePouleIndex = newPouleIndex;
        this.store.dispatch(new SetPouleActive(this.poules[this.activePouleIndex]));
        this.poule_name = this.poules[this.activePouleIndex].poule_name;
    }

    // goToAcceptInvite() {
    //     this.router.navigateByUrl(`${navigation.poules}/${navigation.acceptinvite}`);
    // }

    goToOverview() {
        this.router.navigateByUrl(`${navigation.poules}/${navigation.overview}`);

    }

    ngOnDestroy() {
        this.unsubscribe.next(undefined);
        this.unsubscribe.complete();
    }
}
