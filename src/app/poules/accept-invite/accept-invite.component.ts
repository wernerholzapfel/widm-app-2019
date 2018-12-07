import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/app/ui.service';
import {IUitnodigingResponse, UitnodigingenService} from '../../services/api/uitnodigingen.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {navigation} from '../../constants/navigation.constants';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-accept-invite',
    templateUrl: './accept-invite.component.html',
    styleUrls: ['./accept-invite.component.scss']
})
export class AcceptInviteComponent implements OnInit, OnDestroy {

    uitnodigingen: IUitnodigingResponse[];
    unsubscribe: Subject<void> = new Subject<void>();

    constructor(private uiService: UiService, private uitnodigingenService: UitnodigingenService, private navCtrl: NavController) {
    }

    ngOnInit() {
        this.uiService.uitnodigingen$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            this.uitnodigingen = response;
            if (this.uitnodigingen.length === 0) {
                this.navCtrl.navigateForward(`${navigation.poules}/${navigation.poule}`, false);
            }
        });
    }

    acceptInvite(uitnodiging: IUitnodigingResponse) {
        this.uitnodigingenService.acceptInvite({poule: {id: uitnodiging.poule.id}, uitnodigingId: uitnodiging.id}).subscribe(response => {
            this.uiService.uitnodigingen$
                .next(this.uitnodigingen.filter(item => item.id !== uitnodiging.id));
        });
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }
}
