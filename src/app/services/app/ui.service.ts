import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';

@Injectable()
export class UiService {

    constructor(private store: Store<IAppState>, private toastCtrl: ToastController) {
    }

    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    isSeasonFinished$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    tests$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    statistieken$: BehaviorSubject<any> = new BehaviorSubject(null);
    voorspellingen$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    uitnodigingen$: BehaviorSubject<any> = new BehaviorSubject([]);
    kandidaten$: BehaviorSubject<any> = new BehaviorSubject([]);
    huidigeVoorspelling$: BehaviorSubject<any> = new BehaviorSubject(null);
    testAfgerond$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);
    voorspellingAfgerond$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);

    async presentToast(message: string, color: string = 'tertiary', duration: number = 2000, showCloseButton = true) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: duration,
            position: 'top',
            buttons: [
               {
                    text: 'OK',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ],
            color: color,
            cssClass: 'toast-position'
        });
        toast.present();
    }
}
