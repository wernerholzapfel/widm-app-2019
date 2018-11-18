import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {navigation} from './constants/navigation.constants';
import {HomePage} from './home/home.page';
import {LoginComponent} from './login/login.component';
import {PoulesComponent} from './poules/poules.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: navigation.login, component: LoginComponent},
    {path: navigation.poules, component: PoulesComponent},
    {
        path: navigation.home, component: HomePage,
        children: [

            // {path: '', component: VoorspelComponent},
            {path: '', redirectTo: navigation.dashboard, pathMatch: 'full'},
            {path: navigation.voorspel, loadChildren: './voorspel/voorspel.module#VoorspelPageModule'},
            {path: navigation.dashboard, loadChildren: './dashboard/dashboard.module#DashboardModule'},
            {path: navigation.poules, loadChildren: './poules/poules.module#PoulesPageModule'},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
