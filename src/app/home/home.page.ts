import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {navigation} from '../constants/navigation.constants';
import {routerTransition} from '../animation';
import {Router} from '@angular/router';
import {AuthService} from '../services/authentication/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    animations: [routerTransition],
})
export class HomePage {
    showToolbar = true;
    constructor(private navCtrl: NavController, public router: Router, public authService: AuthService) {
    }

    getState(outlet) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }

    goToVoorspelling() {
        this.navCtrl.navigateForward(`${navigation.home}/${navigation.voorspel}`, false);
    }

    goToDashboard() {
        this.navCtrl.navigateForward(`${navigation.home}/${navigation.dashboard}`, false);
    }
    goToPoule() {
        this.navCtrl.navigateForward(`${navigation.home}/${navigation.poules}`, false);
    }

    goToTest() {
        this.navCtrl.navigateForward(`${navigation.home}/${navigation.poules}`, false);
    }

    goToLogin() {
        this.navCtrl.navigateForward(`${navigation.login}`, false);
    }


}
