import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {IAppState} from '../../store/store';
import {select, Store} from '@ngrx/store';
import {getDeelnemerId} from '../../store/poules/poules.reducer';

@Injectable()
export class UiService {

    constructor(private store: Store<IAppState>) {

        this.store.pipe(select(getDeelnemerId)).subscribe(response => {
            console.log(response);
            this.deelnemerId$.next(response);
        });
    }
    activePoule$: BehaviorSubject<any> = new BehaviorSubject(null);
    deelnemerId$: BehaviorSubject<any> = new BehaviorSubject(null);
    uitnodigingen$: BehaviorSubject<any> = new BehaviorSubject([]);

}
