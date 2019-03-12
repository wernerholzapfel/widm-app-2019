import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/app/ui.service';
import {takeUntil} from 'rxjs/operators';
import {combineLatest, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {navigation} from '../../constants/navigation.constants';
import {getDeelnemerId} from '../../store/poules/poules.reducer';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../store/store';

@Component({
    selector: 'app-poule',
    templateUrl: './poule.component.html',
    styleUrls: ['./poule.component.scss']
})
export class PouleComponent implements OnInit, OnDestroy {
    unsubscribe: Subject<void> = new Subject<void>();
    activePoule: any;
    isPouleAdmin: boolean;
    deelnemerId: string;
    showDetails = false;

    constructor(private uiService: UiService,
                private router: Router,
                private route: ActivatedRoute,
                private store: Store<IAppState>) {
    }

    ngOnInit() {

        combineLatest(this.uiService.activePoule$, this.store.pipe(select(getDeelnemerId)))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(
                ([activePoule, deelnemerId]) => {
                    if (activePoule && deelnemerId) {
                        this.deelnemerId = deelnemerId;
                        this.activePoule = activePoule;
                        this.isPouleAdmin = !!activePoule.admins.find(admin => admin.id === deelnemerId);
                    }
                });
    }

    goToAddDeelnemer() {
        this.router.navigateByUrl(`${navigation.poules}/${navigation.adddeelnemer}/${this.activePoule.id}`);
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
