import {Component, OnInit} from '@angular/core';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';
import {navigation} from '../constants/navigation.constants';
import {NavController} from '@ionic/angular';
import {IAppState} from '../store/store';
import {select, Store} from '@ngrx/store';
import {getDeelnemerScore} from '../store/poules/poules.reducer';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-personal-header',
    templateUrl: './personal-header.component.html',
    styleUrls: ['./personal-header.component.scss']
})
export class PersonalHeaderComponent implements OnInit {
    deelnemer$: Observable<any>;

    options: NativeTransitionOptions = {
        direction: 'down',
        duration: 1000,
        slowdownfactor: -1,
        iosdelay: 100,
        androiddelay: 100,
        fixedPixelsTop: 60,
        fixedPixelsBottom: 0
    };

    constructor(private navCtrl: NavController, private nativePageTransitions: NativePageTransitions, private store: Store<IAppState>) {
    }

    goToVoorspelling() {
        this.nativePageTransitions.slide(this.options);
        this.navCtrl.navigateForward(`${navigation.home}/${navigation.voorspellen}`);
    }

    ngOnInit() {
        this.deelnemer$ = this.store.pipe(select(getDeelnemerScore));
    }

}
