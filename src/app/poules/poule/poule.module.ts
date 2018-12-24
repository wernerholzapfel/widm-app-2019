import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PouleComponent} from './poule.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AvatarModule} from 'ngx-avatar';
import {VoorspellingPuntenItemComponent} from './voorspelling-punten-item/voorspelling-punten-item.component';
import {VoorspellingsscoreModule} from '../../voorspellingsscore/voorspellingsscore.module';

@NgModule({
    declarations: [PouleComponent, VoorspellingPuntenItemComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AvatarModule,
        VoorspellingsscoreModule
    ],
    exports: [PouleComponent]
})
export class PouleModule {
}
