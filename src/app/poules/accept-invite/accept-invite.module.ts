import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AcceptInviteComponent} from './accept-invite.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

@NgModule({
    declarations: [AcceptInviteComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule],
    exports: [AcceptInviteComponent]
})
export class AcceptInviteModule {
}
