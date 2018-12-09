import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PuntenItemComponent} from './punten-item.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
    declarations: [PuntenItemComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [PuntenItemComponent]
})
export class PuntenItemModule {
}
