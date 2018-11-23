import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {PoulesComponent} from './poules.component';
import {AvatarModule} from 'ngx-avatar';
import {PoulesRoutingModule} from './poules-routing.module';
import {PouleModule} from './poule/poule.module';

@NgModule({
    declarations: [PoulesComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AvatarModule,
        PouleModule,
        PoulesRoutingModule,
    ],
    exports: [PoulesComponent]
})
export class PoulesPageModule {
}
