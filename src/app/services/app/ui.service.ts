import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';

@Injectable()
export class UiService {

    constructor(private store: Store<IAppState>, private toastCtrl: ToastController) {
    }

    poules$: BehaviorSubject<any[]> = new BehaviorSubject([]);
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    activePoule$: BehaviorSubject<any> = new BehaviorSubject(null);
    activePouleIndex$: BehaviorSubject<number> = new BehaviorSubject(null);
    tests$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    statistieken$: BehaviorSubject<any> = new BehaviorSubject(null);
    voorspellingen$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    uitnodigingen$: BehaviorSubject<any> = new BehaviorSubject([]);
    kandidaten$: BehaviorSubject<any> = new BehaviorSubject([]);
    huidigeVoorspelling$: BehaviorSubject<any> = new BehaviorSubject(null);
    testAfgerond$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);
    voorspellingAfgerond$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);

    async presentToast(message: string, color: string = 'tertiary') {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'top',
            showCloseButton: true,
            closeButtonText: 'OK',
            color: color,
            cssClass: 'toast-position'
        });
        toast.present();
    }
}
