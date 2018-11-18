import {Component, OnInit} from '@angular/core';
import {navigation} from '../constants/navigation.constants';
import {NavController} from '@ionic/angular';
import {AuthService} from '../services/authentication/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {
    voorspellingBekend = false;
    slideOpts = {
        autoplay: false,
        slidesPerView: 1.1,
        spaceBetween: 10,
        effect: 'flip'
    };
    constructor(private navCtrl: NavController, public authService: AuthService) {
    }

    ngOnInit() {

    }

    goToPoules() {
        this.navCtrl.navigateForward(`${navigation.home}/${navigation.poules}`, false);
    }
}
