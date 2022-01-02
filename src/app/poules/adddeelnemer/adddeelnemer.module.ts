import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdddeelnemerComponent} from './adddeelnemer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {InviteMessagesModule} from '../invite-messages/invite-messages.module';

@NgModule({
    declarations: [AdddeelnemerComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        InviteMessagesModule
    ],
    exports: [AdddeelnemerComponent]
})
export class AdddeelnemerModule {
}
