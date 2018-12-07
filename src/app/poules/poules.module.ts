import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {PoulesComponent} from './poules.component';
import {AvatarModule} from 'ngx-avatar';
import {PoulesRoutingModule} from './poules-routing.module';
import {PouleModule} from './poule/poule.module';
import {AdddeelnemerModule} from './adddeelnemer/adddeelnemer.module';
import {AddpoulesModule} from './addpoules/addpoules.module';
import {AcceptInviteModule} from './accept-invite/accept-invite.module';
import {FooterModule} from '../footer/footer.module';

@NgModule({
    declarations: [PoulesComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AvatarModule,
        PouleModule,
        FooterModule,
        AdddeelnemerModule,
        AddpoulesModule,
        AcceptInviteModule,
        PoulesRoutingModule,
    ],
    exports: [PoulesComponent]
})
export class PoulesPageModule {
}
