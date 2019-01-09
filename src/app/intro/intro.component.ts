import {Component, OnInit} from '@angular/core';
import {navigation} from '../constants/navigation.constants';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

    constructor(public router: Router, public storage: Storage) {
    }

    ngOnInit() {
    }

    goToHome() {
        this.storage.set('isIntroShown', true)
            .then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
            );

        this.router.navigate([`${navigation.home}`]);
    }
}
