import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {PersonalHeaderModule} from '../personal-header/personal-header.module';
import {VoorspellenComponent} from './voorspellen.component';
import {AvatarModule} from 'ngx-avatar';
import {FooterModule} from '../footer/footer.module';

@NgModule({
    declarations: [VoorspellenComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PersonalHeaderModule,
        AvatarModule,
        FooterModule,
        RouterModule.forChild([
            {
                path: '',
                component: VoorspellenComponent
            }
        ])
    ],
    exports: [VoorspellenComponent]
})
export class VoorspellenPageModule {
}
