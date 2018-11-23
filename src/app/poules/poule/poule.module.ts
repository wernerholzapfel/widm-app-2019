import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PouleComponent } from './poule.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AvatarModule} from 'ngx-avatar';
import {PoulesRoutingModule} from '../poules-routing.module';

@NgModule({
  declarations: [PouleComponent],
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      AvatarModule
  ],
    exports: [PouleComponent]
})
export class PouleModule { }
