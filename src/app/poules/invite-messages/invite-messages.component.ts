import {Component, Input, OnInit} from '@angular/core';
import {IPoule} from '../../interface/IPoules';
import {ModalController, Platform} from '@ionic/angular';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';

@Component({
    selector: 'app-invite-messages',
    templateUrl: './invite-messages.component.html',
    styleUrls: ['./invite-messages.component.scss'],
})
export class InviteMessagesComponent implements OnInit {

    @Input() poule: IPoule;
    inviteMessages: InviteMessage[] = [];
    constructor(private plt: Platform,
                private socialSharing: SocialSharing,
                private modalController: ModalController) {
    }

    ngOnInit() {
        this.inviteMessages = [
            {
                message: `Ik nodig je uit voor de poule '${this.poule.poule_name}' voor 'Wie is de Molloot'.
                Neem deel aan de poule met deze code: ${this.poule.pouleInvitations[0].id}`,
                subject: 'Wie is de Molloot',
                title: 'Poule uitnodiging'
            }, {
                message: `${this.poule.pouleInvitations[0].id}`,
                subject: 'Wie is de Molloot',
                title: 'Poule code'
            }, {
                message: `Ik nodig je uit voor de poule '${this.poule.poule_name}' voor 'Wie is de Molloot'.
                Neem deel aan de poule met deze code: ${this.poule.pouleInvitations[0].id}
                Download 'Wie is de Molloot' hier!
                App store: https://apps.apple.com/nl/app/molloot/id1314512869
                Google play: https://play.google.com/store/apps/details?id=com.wernerholzapfel.mollotenapp`,
                subject: 'Wie is de Molloot',
                title: 'Poule + Spel uitnodiging'
            }, {
                message: `Download 'Wie is de Molloot' hier!
                App store: https://apps.apple.com/nl/app/molloot/id1314512869
                Google play: https://play.google.com/store/apps/details?id=com.wernerholzapfel.mollotenapp`,
                subject: 'Wie is de Molloot',
                title: 'Download links'
            }
        ];
    }


    shareMessage(inviteMessage: InviteMessage) {
        if (this.plt.is('cordova')) {
            this.socialSharing.share(inviteMessage.message, inviteMessage.subject
            ).then(item => {
                this.dismissModal();
            });
        } else {
            console.log(inviteMessage.message);
            console.log(inviteMessage.subject);
        }
    }

    async dismissModal() {
        await this.modalController.dismiss();
    }
}

export interface InviteMessage {
    message: string;
    subject: string;
    title: string;
}
