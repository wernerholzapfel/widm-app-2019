import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {PersonalHeaderModule} from '../personal-header/personal-header.module';
import {DashboardModule} from '../dashboard/dashboard.module';
import {AvatarModule} from 'ngx-avatar';
import {VoorspellenPageModule} from '../voorspellen/voorspellen.module';

@NgModule({
    declarations: [HomePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PersonalHeaderModule,
        DashboardModule,
        VoorspellenPageModule,
        AvatarModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
    providers: []
})
export class HomePageModule {
}
