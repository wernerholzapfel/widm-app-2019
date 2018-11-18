import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {navigation} from '../constants/navigation.constants';

@Component({
    selector: 'app-voorspel',
    templateUrl: './voorspel.component.html',
    styleUrls: ['./voorspel.component.scss']
})
export class VoorspelComponent implements OnInit {

    constructor(private navCtrl: NavController) {
    }

    ngOnInit() {
    }

    goToPoules() {
        this.navCtrl.navigateForward(`${navigation.poules}`);
    }
}
