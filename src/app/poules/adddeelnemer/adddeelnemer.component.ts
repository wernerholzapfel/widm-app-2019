import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/app/ui.service';
import {UitnodigingenService} from '../../services/api/uitnodigingen.service';
import {ActivatedRoute} from '@angular/router';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {ModalController, Platform} from '@ionic/angular';
import {getActivePoule} from '../../store/poules/poules.reducer';
import {IAppState} from '../../store/store';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {skipWhile, takeUntil} from 'rxjs/operators';
import {IPoule} from '../../interface/IPoules';
import {InviteMessagesComponent} from '../invite-messages/invite-messages.component';


@Component({
    selector: 'app-adddeelnemer',
    templateUrl: './adddeelnemer.component.html',
    styleUrls: ['./adddeelnemer.component.scss']
})
export class AdddeelnemerComponent implements OnInit, OnDestroy {

    unsubscribe = new Subject<void>();
    poule: IPoule;

    constructor(private uitnodigingenService: UitnodigingenService,
                private uiService: UiService,
                private route: ActivatedRoute,
                private plt: Platform,
                private socialSharing: SocialSharing,
                private modalController: ModalController,
                private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.store.pipe(select(getActivePoule))
            .pipe(skipWhile(response => !response))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(activePoule => {
                this.poule = activePoule;
            });
    }


    async shareInvite() {
        const popover = await this.modalController.create({
            component: InviteMessagesComponent,
            componentProps: {poule: this.poule},
        });
        return await popover.present();
    }


    ngOnDestroy() {
        this.unsubscribe.next(undefined);
        this.unsubscribe.complete();
    }

}
