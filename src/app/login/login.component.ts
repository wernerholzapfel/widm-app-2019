import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../services/authentication/auth.service';
import {NavController} from '@ionic/angular';
import {navigation} from '../constants/navigation.constants';
import {UiService} from '../services/app/ui.service';
import {DeelnemerService} from '../deelnemer.service';
import {FetchPoulesInProgress} from '../store/poules/poules.actions';
import {IAppState} from '../store/store';
import {Store} from '@ngrx/store';
import {FetchActiesInProgress, FetchActiesSuccess} from '../store/acties/acties.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @ViewChild('loginForm') loginForm: NgForm;
    @ViewChild('signupForm') signupForm: NgForm;
    user = {
        email: '',
        password: '',
        displayName: '',
        teamName: '',
    };
    activeSegment = 'inschrijven';

    constructor(public authService: AuthService,
                private router: Router, public navCtrl: NavController,
                private uiService: UiService, private deelnemerService: DeelnemerService, private store: Store<IAppState>) {
    }
    wachtwoordvergeten = false;

    ngOnInit() {
    }

    signInWithEmail() {
        this.authService.signInRegular(this.loginForm.value.email, this.loginForm.value.password)
            .then((res) => {
                this.navCtrl.navigateForward(`${navigation.home}/${navigation.dashboard}`, false);
            })
            .catch((err) => {
                this.uiService.presentToast(err.message);
            });
    }

    sendPasswordResetEmail() {
        this.authService.sendPasswordResetEmail(this.user.email)
            .then((res) => {
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
                        }).subscribe(response => {
                            // set acties to null so data is reloaded on app.component when acties are succesfully fetched
                            this.store.dispatch(new FetchActiesSuccess(null));
                            this.store.dispatch(new FetchActiesInProgress());
                        });
                        this.navCtrl.navigateForward(`${navigation.home}/${navigation.dashboard}`, false);
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
