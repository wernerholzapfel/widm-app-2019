import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {VoorspelComponent} from './voorspel.component';

@NgModule({
    declarations: [VoorspelComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
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
