import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UiService} from '../../services/app/ui.service';
import {NavController} from '@ionic/angular';
import {UitnodigingenService} from '../../services/api/uitnodigingen.service';
import {switchMap, take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-adddeelnemer',
    templateUrl: './adddeelnemer.component.html',
    styleUrls: ['./adddeelnemer.component.scss']
})
export class AdddeelnemerComponent implements OnInit {

    @ViewChild('form') form: NgForm;

    pouleId: string;
    uitnodigingen: any[];

    constructor(private uitnodigingenService: UitnodigingenService,
                private uiService: UiService,
                private navCtrl: NavController,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.pipe(switchMap(params => {
            this.pouleId = params['pouleid'];
            return this.uitnodigingenService.getUitnodigingenByPoule(params['pouleid']).pipe(take(1));
        })).subscribe(response => {
            this.uitnodigingen = response.sort((a, b) => {
                return a.isDeclined - b.isDeclined || a.isAccepted - b.isAccepted;
            });
        });
    }


    addDeelnemer() {
        this.uitnodigingenService.addDeelnemer({
            poule: {id: this.pouleId},
            uniqueIdentifier: this.form.value.email
        }).subscribe(() => {
            this.uitnodigingen = [{uniqueIdentifier: this.form.value.email}, ...this.uitnodigingen];
                this.form.reset();
            }
        );
    }

}
