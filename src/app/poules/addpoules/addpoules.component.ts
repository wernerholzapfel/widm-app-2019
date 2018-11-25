import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PoulesService} from '../../services/api/poules.service';
import {UiService} from '../../services/app/ui.service';
import {navigation} from '../../constants/navigation.constants';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-addpoules',
    templateUrl: './addpoules.component.html',
    styleUrls: ['./addpoules.component.scss']
})
export class AddpoulesComponent implements OnInit {
    @ViewChild('createPouleForm') createPouleForm: NgForm;

    constructor(private poulesService: PoulesService, private uiService: UiService,  private navCtrl: NavController) {
    }

    ngOnInit() {
    }

    createPoule() {
        console.log(this.createPouleForm);
        const currentUser = {id: this.uiService.deelnemerId$.getValue()};
        console.log(currentUser);
        this.poulesService.createPoule({poule_name: this.createPouleForm.value.name, deelnemers: [currentUser], admins: [currentUser]}).subscribe(response => {
            // todo add to redux store
            // this.uiService.showToast(`Poule ${this.createPouleForm.value.name} aangemaakt`);
            this.navCtrl.navigateForward(`${navigation.poules}/${navigation.poule}`, false);
            }
        );
    }
}
