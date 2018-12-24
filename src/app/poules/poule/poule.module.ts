import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PouleComponent} from './poule.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AvatarModule} from 'ngx-avatar';
import {VoorspellingsscoreModule} from '../../voorspellingsscore/voorspellingsscore.module';
import {VoorspellingPuntenItemModule} from './voorspelling-punten-item/voorspelling-punten-item.module';

@NgModule({
    declarations: [PouleComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AvatarModule,
        VoorspellingsscoreModule,
        VoorspellingPuntenItemModule
    ],
    exports: [PouleComponent]
})
export class PouleModule {
}
