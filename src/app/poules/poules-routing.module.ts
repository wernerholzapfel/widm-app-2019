import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PoulesComponent} from './poules.component';
import {PouleComponent} from './poule/poule.component';
import {AdddeelnemerComponent} from './adddeelnemer/adddeelnemer.component';
import {navigation} from '../constants/navigation.constants';
import {AddpoulesComponent} from './addpoules/addpoules.component';
import {AcceptInviteComponent} from './accept-invite/accept-invite.component';
import {OverviewComponent} from './overview/overview.component';

const routes: Routes = [
    {
        path: '', component: PoulesComponent, children: [
            {path: '', component: PouleComponent},
            {path: navigation.overview, component: OverviewComponent},
            {path: `${navigation.poule}`, component: PouleComponent},
            {path: `${navigation.adddeelnemer}`, component: AdddeelnemerComponent},
            {path: navigation.addpoule, component: AddpoulesComponent},
            {path: navigation.acceptinvite, component: AcceptInviteComponent}]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PoulesRoutingModule {
}
