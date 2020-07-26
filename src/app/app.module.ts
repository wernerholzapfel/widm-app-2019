import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomePageModule} from './home/home.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {DeelnemerService} from './deelnemer.service';
import {IntroModule} from './intro/intro.module';
import {IonicStorageModule} from '@ionic/storage';
import {StatistiekenModule} from './statistieken/statistieken.module';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {CodePush} from '@ionic-native/code-push/ngx';


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        HomePageModule,
        HttpClientModule,
        PoulesPageModule,
        DisclaimerModule,
        FooterModule,
        TestModule,
        PuntenModule,
        PuntenItemModule,
        IntroModule,
        StatistiekenModule,
        AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
        StoreModule.forRoot(reducers),
        IonicStorageModule.forRoot(),
        StoreDevtoolsModule.instrument(),
        // StoreRouterConnectingModule,
        EffectsModule.forRoot([ActiesEffects, PoulesEffects])],
    providers: [
        StatusBar,
        SplashScreen,
        ActiesService,
        PoulesService,
        AuthService,
        UiService,
        DeelnemerService,
        SocialSharing,
        CodePush,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        OneSignal
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
