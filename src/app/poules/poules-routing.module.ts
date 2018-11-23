import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PoulesComponent} from './poules.component';
import {PouleComponent} from './poule/poule.component';

const routes: Routes = [
    {
        path: '', component: PoulesComponent, pathMatch: 'full', children: [
            {path: '', component: PouleComponent}]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PoulesRoutingModule {
}
