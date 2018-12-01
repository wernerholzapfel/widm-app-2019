import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UiService} from '../../services/app/ui.service';
import {NavController} from '@ionic/angular';
import {UitnodigingenService} from '../../services/api/uitnodigingen.service';

@Component({
    selector: 'app-adddeelnemer',
    templateUrl: './adddeelnemer.component.html',
    styleUrls: ['./adddeelnemer.component.scss']
})
export class AdddeelnemerComponent implements OnInit {

    @ViewChild('form') form: NgForm;

    constructor(private uitnodigingenService: UitnodigingenService, private uiService: UiService, private navCtrl: NavController) {
    }

    ngOnInit() {
        // todo show list of invitations for poule
    }


    addDeelnemer() {
        const currentUser = {id: this.uiService.activePoule$.getValue()};
        console.log(currentUser);
        this.uitnodigingenService.addDeelnemer({
            poule: {id: this.uiService.activePoule$.getValue().id},
            uniqueIdentifier: this.form.value.email
        }).subscribe(() => {
                // this.uiService.showToast(`${this.form.value.email} uitgenodigd`);
                this.form.reset();
                // todo add to storage?
            }
        );
    }

}
