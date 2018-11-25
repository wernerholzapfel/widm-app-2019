import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ToastController} from '@ionic/angular';

@Injectable()
export class UiService {

    constructor() {}
    activePoule$: BehaviorSubject<any> = new BehaviorSubject(null);
    deelnemerId$: BehaviorSubject<any> = new BehaviorSubject(null);
    uitnodigingen$: BehaviorSubject<any> = new BehaviorSubject([]);

}
