import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../store/store';
import {getDeelnemer, getPoules} from '../store/poules/poules.reducer';
import {Observable, Subject} from 'rxjs';
import {IPoule} from '../interface/IPoules';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {UiService} from '../services/app/ui.service';

@Component({
    selector: 'app-poules',
    templateUrl: './poules.component.html',
    styleUrls: ['./poules.component.scss']
})
export class PoulesComponent implements OnInit, OnDestroy {

    deelnemer$: Observable<any>;
    unsubscribe = new Subject<void>();
    poules: IPoule[];
    positie: number;
    deelnemerId: string;
    activePouleIndex: number;
    numberOfPoules: number;
    poule_name: string;

    constructor(private store: Store<IAppState>, private navCtrl: NavController, public router: Router, private uiService: UiService) {
    }

    ngOnInit() {
        this.deelnemer$ = this.store.pipe(select(getDeelnemer));

        this.deelnemer$.pipe(takeUntil(this.unsubscribe))
            .subscribe(deelnemer => {
                if (deelnemer.id) {
                    this.uiService.deelnemerId$.next(deelnemer.id);
                    this.deelnemerId = deelnemer.id;
                    if (deelnemer.poules.length > 0) {
                        this.poules = deelnemer.poules;
                        this.numberOfPoules = deelnemer.poules.length;
                        this.activatePoule(0);
                    }
                }
            });
    }


    activatePoule(newPouleIndex) {
        this.activePouleIndex = newPouleIndex;
        this.uiService.activePoule$.next(this.poules[this.activePouleIndex]);
        this.positie = this.poules[this.activePouleIndex].deelnemers.find(d => d.id === this.deelnemerId).positie;
        this.poule_name = this.poules[this.activePouleIndex].poule_name;
    }

    ngOnDestroy() {
        this.unsubscribe.next();
    }
}
