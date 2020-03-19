import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/app/ui.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {navigation} from '../../constants/navigation.constants';
import {IPoule} from '../../interface/IPoules';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getAllPoules, getDeelnemerId} from '../../store/poules/poules.reducer';
import {IAppState} from '../../store/store';
import {SetPouleActive} from '../../store/poules/poules.actions';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
    unsubscribe = new Subject<void>();
    poules: any[] = [];
    deelnemerId: string;

    constructor(private uiService: UiService, private router: Router, private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.store.pipe(
            select(getDeelnemerId),
            takeUntil(this.unsubscribe))
            .subscribe(response => {
                this.deelnemerId = response;
            });

        this.store.pipe(select(getAllPoules)).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            this.poules = response;
        });
    }

    navigateToPoule(poule: IPoule, index: number) {
        this.store.dispatch(new SetPouleActive(poule));
        this.router.navigate([`${navigation.poules}/${navigation.poule}`]);
    }

    goToAddPoule() {
        this.router.navigate([`${navigation.poules}/${navigation.addpoule}`]);
    }

    determinePositionFromUser(poule: any): number {
        if (poule && poule.deelnemers && this.deelnemerId) {
            const deelnemerInList = poule.deelnemers.find(deelnemer => deelnemer.id === this.deelnemerId);
            return deelnemerInList ? deelnemerInList.positie : null;
        } else {
            return null;
        }

    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
