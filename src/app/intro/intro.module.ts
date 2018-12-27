import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IntroComponent} from './intro.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
    declarations: [IntroComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [IntroComponent]
})
export class IntroModule {
}
