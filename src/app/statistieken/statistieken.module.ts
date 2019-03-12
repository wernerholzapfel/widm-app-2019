import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatistiekenComponent} from './statistieken.component';
import {IonicModule} from '@ionic/angular';
import {FooterModule} from '../footer/footer.module';

@NgModule({
    declarations: [StatistiekenComponent],
    imports: [
        CommonModule,
        IonicModule,
        FooterModule
    ],
    exports: [StatistiekenComponent]
})
export class StatistiekenModule {
}
