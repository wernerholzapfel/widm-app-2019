import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        AngularFireAuthModule,
    ],
    providers: [],
    exports: [LoginComponent]

})
export class LoginComponentModule {
}
