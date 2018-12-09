import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NativePageTransitions} from '@ionic-native/native-page-transitions/ngx';
import {HomePageModule} from './home/home.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './services/authentication/token.interceptor';
import {ActiesEffects} from './store/acties/acties.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/store';
import {ActiesService} from './services/api/acties.service';
import {EffectsModule} from '@ngrx/effects';
import {PoulesEffects} from './store/poules/poules.effects';
import {PoulesService} from './services/api/poules.service';
import {AuthService} from './services/authentication/auth.service';
import {PoulesPageModule} from './poules/poules.module';
import {DisclaimerModule} from './disclaimer/disclaimer.module';
import {TestModule} from './test/test.module';
import {UiService} from './services/app/ui.service';
import {FooterModule} from './footer/footer.module';
import {PuntenModule} from './punten/punten.module';
import {PuntenItemModule} from './punten/punten-item/punten-item.module';
import {AvatarModule} from 'ng2-avatar';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        HomePageModule,
        PoulesPageModule,
        DisclaimerModule,
        FooterModule,
        TestModule,
        PuntenModule,
        PuntenItemModule,
        AvatarModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument(),
        // StoreRouterConnectingModule,
        EffectsModule.forRoot([ActiesEffects, PoulesEffects])],
    providers: [
        StatusBar,
        SplashScreen,
        NativePageTransitions,
        ActiesService,
        PoulesService,
        AuthService,
        UiService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
