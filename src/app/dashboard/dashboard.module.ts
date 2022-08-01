
import {DashboardComponent} from './dashboard.component';
import {LoginComponentModule} from '../login/login.module';
import {PoulesPageModule} from '../poules/poules.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

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
    providers: [],
    exports: [DashboardComponent]
})
export class DashboardModule {
}
