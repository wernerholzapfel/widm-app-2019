import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PuntenComponent} from './punten.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterModule} from '../footer/footer.module';
import {IonicModule} from '@ionic/angular';
import {PuntenItemModule} from './punten-item/punten-item.module';
import {PersonalHeaderModule} from '../personal-header/personal-header.module';
import {AvatarModule} from 'ng2-avatar';
import {VoorspellingsscoreModule} from '../voorspellingsscore/voorspellingsscore.module';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    {
        path: 'punten',
        component: PuntenComponent,
    }, {
        path: '',
        redirectTo: 'punten',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [PuntenComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PersonalHeaderModule,
        FooterModule,
        PuntenItemModule,
        IonicModule,
        AvatarModule,
        VoorspellingsscoreModule,
        RouterModule.forChild(routes)
    ],
    exports: [PuntenComponent]
})
export class PuntenModule {
}
