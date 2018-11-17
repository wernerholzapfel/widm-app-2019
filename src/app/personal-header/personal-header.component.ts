import {Component, OnInit} from '@angular/core';
import {NativePageTransitions, NativeTransitionOptions} from '@ionic-native/native-page-transitions/ngx';
import {navigation} from '../constants/navigation.constants';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-personal-header',
    templateUrl: './personal-header.component.html',
    styleUrls: ['./personal-header.component.scss']
})
export class PersonalHeaderComponent implements OnInit {

    options: NativeTransitionOptions = {
        direction: 'down',
        duration: 1000,
        slowdownfactor: -1,
        iosdelay: 100,
        androiddelay: 100,
        fixedPixelsTop: 60,
        fixedPixelsBottom: 0
    };

    constructor(private navCtrl: NavController, private nativePageTransitions: NativePageTransitions) {
    }

    goToVoorspelling() {
        this.nativePageTransitions.slide(this.options);
        this.navCtrl.navigateForward(`${navigation.home}/${navigation.voorspel}`);
    }

    ngOnInit() {
    }

}
