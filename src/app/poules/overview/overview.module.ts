import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './overview.component';
import {IonicModule} from '@ionic/angular';
import {AddpoulesModule} from '../addpoules/addpoules.module';
import {AvatarModule} from 'ngx-avatar';

@NgModule({
    declarations: [OverviewComponent],
    imports: [
        CommonModule,
        IonicModule,
        AvatarModule,
        AddpoulesModule
    ],
    exports: [OverviewComponent]
})
export class OverviewModule {
}
