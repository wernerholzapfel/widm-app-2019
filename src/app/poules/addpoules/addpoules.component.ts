import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PoulesService} from '../../services/api/poules.service';
import {UiService} from '../../services/app/ui.service';
import {navigation} from '../../constants/navigation.constants';
import {NavController} from '@ionic/angular';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {getDeelnemerId} from '../../store/poules/poules.reducer';
import {FetchPoulesInProgress} from '../../store/poules/poules.actions';

@Component({
    selector: 'app-addpoules',
    templateUrl: './addpoules.component.html',
    styleUrls: ['./addpoules.component.scss']
})
export class AddpoulesComponent implements OnInit {
    @ViewChild('createPouleForm') createPouleForm: NgForm;
    unsubscribe: Subject<void> = new Subject<void>();
    deelnemerId: string;

    constructor(private poulesService: PoulesService,
                private uiService: UiService,
                private navCtrl: NavController,
                private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.store.pipe(select(getDeelnemerId)).subscribe(response => {
            this.deelnemerId = response;
        });
    }

    createPoule() {
        console.log(this.createPouleForm);
        const currentUser = {id: this.deelnemerId};
        console.log(currentUser);
        this.poulesService.createPoule({
            poule_name: this.createPouleForm.value.name,
            deelnemers: [currentUser],
            admins: [currentUser]
        }).subscribe(response => {
                // todo add to redux store
                this.uiService.presentToast(`Poule ${this.createPouleForm.value.name} aangemaakt`);
                this.store.dispatch(new FetchPoulesInProgress());
                this.navCtrl.navigateForward(`${navigation.poules}/${navigation.poule}`, false);
            }
        );
    }
}
