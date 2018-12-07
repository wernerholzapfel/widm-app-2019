import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {IAppState} from '../../store/store';
import {select, Store} from '@ngrx/store';
import {getDeelnemerId} from '../../store/poules/poules.reducer';

@Injectable()
export class UiService {

    constructor(private store: Store<IAppState>, private toastCtrl: ToastController) {
    }

    activePoule$: BehaviorSubject<any> = new BehaviorSubject(null);
    uitnodigingen$: BehaviorSubject<any> = new BehaviorSubject([]);
    kandidaten$: BehaviorSubject<any> = new BehaviorSubject([]);
    huidigeVoorspelling$: BehaviorSubject<any> = new BehaviorSubject(null);

    async presentToast(message: string) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 50000,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'OK',
            color: 'dark'
        });
        toast.present();
    }
}
