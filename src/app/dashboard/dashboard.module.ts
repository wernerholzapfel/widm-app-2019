import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {DashboardComponent} from './dashboard.component';
import {RouterModule} from '@angular/router';
import {LoginComponentModule} from '../login/login.module';
import {AuthService} from '../services/authentication/auth.service';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {PoulesPageModule} from '../poules/poules.module';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AngularFireAuthModule,
        LoginComponentModule,
        PoulesPageModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent
            }
        ])
    ],
    providers: [AuthService],
    exports: [DashboardComponent]
})
export class DashboardModule {
}
