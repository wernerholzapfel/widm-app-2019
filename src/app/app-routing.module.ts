import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {navigation} from './constants/navigation.constants';
import {HomePage} from './home/home.page';
import {TestComponent} from './test/test.component';
import {VoorspellenComponent} from './voorspellen/voorspellen.component';
import {PuntenComponent} from './punten/punten.component';
import {IntroComponent} from './intro/intro.component';
import {IntroGuard} from './intro.guard';
import {StatistiekenComponent} from './statistieken/statistieken.component';

const routes: Routes = [
    {path: '', redirectTo: navigation.home, pathMatch: 'full'},
    {path: navigation.intro, component: IntroComponent},
    {path: navigation.statistieken, component: StatistiekenComponent},
    {path: navigation.home, component: HomePage, canActivate: [IntroGuard]},
    {path: navigation.poules, loadChildren: './poules/poules.module#PoulesPageModule'},
    {path: navigation.punten, component: PuntenComponent},
    {path: navigation.test, component: TestComponent},
    {path: navigation.voorspellen, component: VoorspellenComponent},
    {path: '**', redirectTo: navigation.home}];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
