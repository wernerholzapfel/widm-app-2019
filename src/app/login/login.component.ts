import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '../services/authentication/auth.service';
import {navigation} from '../constants/navigation.constants';
import {UiService} from '../services/app/ui.service';
import {DeelnemerService} from '../deelnemer.service';
import {IAppState} from '../store/store';
import {Store} from '@ngrx/store';
import {FetchActiesInProgress, FetchActiesSuccess} from '../store/acties/acties.actions';
import {Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @ViewChild('loginForm', {static: false}) loginForm: NgForm;
    @ViewChild('signupForm', {static: false}) signupForm: NgForm;
    user = {
        email: '',
        password: '',
        displayName: '',
        teamName: '',
    };
    activeSegment = 'inschrijven';

    constructor(public authService: AuthService,
                public router: Router,
                private platform: Platform,
                private oneSignal: OneSignal,
                private storage: Storage,
                private uiService: UiService, private deelnemerService: DeelnemerService, private store: Store<IAppState>) {
    }

    wachtwoordvergeten = false;

    ngOnInit() {
    }

    signInWithEmail() {
        this.authService.signInRegular(this.loginForm.value.email, this.loginForm.value.password)
            .then((res) => {
                delete this.user.password;
                this.deelnemerService.postDeelnemer({
                    email: this.loginForm.value.email
                }).pipe(take(1)).subscribe(response => {
                    // set acties to null so data is reloaded on app.component when acties are succesfully fetched
                    this.store.dispatch(new FetchActiesSuccess(null));
                    this.store.dispatch(new FetchActiesInProgress());
                    if (this.platform.is('cordova')) {
                        this.oneSignal.sendTag('displayName', response.display_name);
                    }
                    this.storage.set('seizoen', '2020').then(result => {
                        console.log(result);
                    });
                    this.router.navigate([`${navigation.home}/${navigation.dashboard}`, {animated: true}]);
                });
            })
            .catch((err) => {
                this.uiService.presentToast(err.message);
            });
    }

    sendPasswordResetEmail() {
        this.authService.sendPasswordResetEmail(this.user.email)
            .then((res) => {
                this.uiService.presentToast('Er is een wachtwoordreset mail gestuurd naar ' + this.user.email, 'success', 4000);
                this.wachtwoordvergeten = false;
            })
            .catch((err) => {
                console.log('error: ' + err);
            });
    }

    signUpRegular() {
        this.authService.signUpRegular(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.displayName)
            .then((res) => {
                    if (res) {
                        delete this.user.password;
                        this.deelnemerService.postDeelnemer({
                            display_name: this.signupForm.value.displayName,
                            email: this.signupForm.value.email
                        }).pipe(take(1)).subscribe(response => {
                            // set acties to null so data is reloaded on app.component when acties are succesfully fetched
                            this.store.dispatch(new FetchActiesSuccess(null));
                            this.store.dispatch(new FetchActiesInProgress());
                            this.storage.set('seizoen', '2020').then(result => {
                                console.log(result);
                            });
                            if (this.platform.is('cordova')) {
                                this.oneSignal.sendTag('displayName', this.signupForm.value.displayName);
                            }
                            this.router.navigate([`${navigation.home}/${navigation.dashboard}`, {animated: true}]);
                        });
                    }
                }
            )
            .catch((err) => {
                this.uiService.presentToast(err.message);
            });
    }


    activateResetPassword(isTrue: boolean) {
        this.wachtwoordvergeten = isTrue;
    }

    segmentChanged($event) {
        this.activeSegment = $event.detail.value;
    }
}

/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
