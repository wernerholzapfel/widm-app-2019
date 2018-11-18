import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../store/store';
import {getPoules} from '../store/poules/poules.reducer';
import {Observable} from 'rxjs';
import {IPoule} from '../interface/IPoules';
import {navigation} from '../constants/navigation.constants';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-poules',
    templateUrl: './poules.component.html',
    styleUrls: ['./poules.component.scss']
})
export class PoulesComponent implements OnInit {

    poules$: Observable<IPoule[]>;
    activePoule: IPoule;
    poules: IPoule[];

    constructor(private store: Store<IAppState>, private navCtrl: NavController, public router: Router) {
    }

    ngOnInit() {
        this.poules$ = this.store.pipe(select(getPoules));
    }

    selectPoule(poule: IPoule) {
        this.activePoule = poule;
    }

    expandView() {
        this.navCtrl.navigateForward(`${navigation.poules}`, false);
    }

    closeView() {
        this.navCtrl.navigateRoot(`/${navigation.home}/${navigation.dashboard}`, false);
    }
}
