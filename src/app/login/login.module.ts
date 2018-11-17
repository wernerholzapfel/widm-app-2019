import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';
import {PersonalHeaderComponent} from '../personal-header/personal-header.component';
import {AuthService} from '../services/authentication/auth.service';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        AngularFireAuthModule,
    ],
    providers: [AuthService],
    exports: [LoginComponent]

})
export class LoginComponentModule {
}
