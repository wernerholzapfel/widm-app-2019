import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {PersonalHeaderModule} from '../personal-header/personal-header.module';
import {DashboardModule} from '../dashboard/dashboard.module';
import {VoorspelComponent} from '../voorspel/voorspel.component';
import {VoorspelPageModule} from '../voorspel/voorspel.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AvatarModule} from 'ngx-avatar';
import {LoginComponentModule} from '../login/login.module';
import {AuthService} from '../services/authentication/auth.service';

@NgModule({
    declarations: [HomePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PersonalHeaderModule,
        DashboardModule,
        VoorspelPageModule,
        AvatarModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
    providers: [AuthService]
})
export class HomePageModule {
}
