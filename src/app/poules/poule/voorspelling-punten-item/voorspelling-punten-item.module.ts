import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoorspellingPuntenItemComponent} from './voorspelling-punten-item.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
    declarations: [VoorspellingPuntenItemComponent],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [VoorspellingPuntenItemComponent]
})
export class VoorspellingPuntenItemModule {
}
