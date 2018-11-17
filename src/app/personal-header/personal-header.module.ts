import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {PersonalHeaderComponent} from '../personal-header/personal-header.component';

@NgModule({
    declarations: [PersonalHeaderComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [PersonalHeaderComponent]
})
export class PersonalHeaderModule {
}
