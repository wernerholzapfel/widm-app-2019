import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {navigation} from './constants/navigation.constants';
import {HomePage} from './home/home.page';
import {LoginComponent} from './login/login.component';
import {DisclaimerComponent} from './disclaimer/disclaimer.component';
import {TestComponent} from './test/test.component';
import {VoorspelComponent} from './voorspel/voorspel.component';

const routes: Routes = [
    {path: '', redirectTo: navigation.home, pathMatch: 'full'},
    {path: navigation.login, component: LoginComponent},
    {path: navigation.poules, loadChildren: './poules/poules.module#PoulesPageModule'},
    {path: navigation.disclaimer, component: DisclaimerComponent},
    {path: navigation.test, component: TestComponent},
    {path: navigation.voorspellen, component: VoorspelComponent},
    {path: navigation.home, component: HomePage},
    {path: '**', redirectTo: navigation.home}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
