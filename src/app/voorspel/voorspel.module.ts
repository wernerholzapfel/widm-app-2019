import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {VoorspelComponent} from './voorspel.component';
import {PersonalHeaderModule} from '../personal-header/personal-header.module';

@NgModule({
    declarations: [VoorspelComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PersonalHeaderModule,
        RouterModule.forChild([
            {
                path: '',
                component: VoorspelComponent
            }
        ])
    ],
    exports: [VoorspelComponent]
})
export class VoorspelPageModule {
}
