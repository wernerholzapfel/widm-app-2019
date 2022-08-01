import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomePageModule} from './home/home.module';
import {environment} from '../environments/environment';
import {TokenInterceptor} from './services/authentication/token.interceptor';
import {ActiesEffects} from './store/acties/acties.effects';
import {reducers} from './store/store';
import {ActiesService} from './services/api/acties.service';
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
import {StatistiekenModule} from './statistieken/statistieken.module';
import {AuthInterceptor} from './interceptor/unauthorized/unauthorized.interceptor';
import {LoaderInterceptor} from './services/authentication/loading.interceptor';
import {AngularFireModule} from '@angular/fire/compat';
import {BrowserModule} from '@angular/platform-browser';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {RouteReuseStrategy} from '@angular/router';
import {CodePush} from '@ionic-native/code-push/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {IonicStorageModule} from '@ionic/storage-angular';
import {NgModule} from '@angular/core';



@NgModule({
    declarations: [AppComponent],
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
        EffectsModule.forRoot([ActiesEffects, PoulesEffects])
    ],
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
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        OneSignal
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
