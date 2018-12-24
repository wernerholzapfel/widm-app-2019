import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoorspellingsscoreComponent} from './voorspellingsscore.component';
import {IonicModule} from '@ionic/angular';
import {PuntenItemModule} from '../punten/punten-item/punten-item.module';

@NgModule({
    declarations: [VoorspellingsscoreComponent],
    imports: [
        CommonModule,
        IonicModule,
        PuntenItemModule,
    ],
    exports: [VoorspellingsscoreComponent]
})
export class VoorspellingsscoreModule {
}
