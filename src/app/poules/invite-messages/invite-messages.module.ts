import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InviteMessagesComponent} from './invite-messages.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [InviteMessagesComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [InviteMessagesComponent]
})
export class InviteMessagesModule {
}
