import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {navigation} from '../constants/navigation.constants';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

    constructor(public navCtrl: NavController, public storage: Storage) {
    }

    ngOnInit() {
    }

    goToHome() {
        this.storage.set('isIntroShown', true)
            .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
            );

        this.navCtrl.navigateRoot(`${navigation.home}`);
    }
}
