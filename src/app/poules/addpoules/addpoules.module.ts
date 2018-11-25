import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddpoulesComponent} from './addpoules.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

@NgModule({
    declarations: [AddpoulesComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule
    ],
    exports: [AddpoulesComponent]
})
export class AddpoulesModule {
}
