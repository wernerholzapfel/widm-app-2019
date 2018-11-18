import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {PoulesComponent} from './poules.component';

@NgModule({
    declarations: [PoulesComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [PoulesComponent]
})
export class PoulesPageModule {
}
