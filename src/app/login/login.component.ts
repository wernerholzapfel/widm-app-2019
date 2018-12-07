import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../services/authentication/auth.service';
import {NavController} from '@ionic/angular';
import {navigation} from '../constants/navigation.constants';

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
                private router: Router, public navCtrl: NavController) {
    }
    wachtwoordvergeten = false;

    ngOnInit() {
    }

    signInWithEmail() {
        this.authService.signInRegular(this.loginForm.value.email, this.loginForm.value.password)
            .then((res) => {
                // console.log(res);
                // this.store.dispatch(new fromParticipantForm.ClearParticipantform());
                this.navCtrl.navigateForward(`${navigation.home}/${navigation.dashboard}`, false);
            })
            .catch((err) => {
                // this.snackBar.open(err.message, 'OK', {});
                console.log('error: ' + err);
            });
    }

    sendPasswordResetEmail() {
        this.authService.sendPasswordResetEmail(this.user.email)
            .then((res) => {
                // this.snackBar.open(res, 'OK', {});
            })
            .catch((err) => {
                // this.snackBar.open(err.message, 'OK', {});
                console.log('error: ' + err);
            });
    }

    signUpRegular() {
        this.authService.signUpRegular(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.displayName)
            .then((res) => {
                    if (res) {
                        // delete this.user.password;
                        // this.participantService.postParticipant({
                        //   displayName: this.user.displayName,
                        //   teamName: this.user.teamName,
                        //   email: this.user.email
                        // }).subscribe(response => {
                        //   console.log('user opgeslagen in database');
                        // });
                        // this.store.dispatch(new fromParticipantForm.ClearParticipantform());
                        this.navCtrl.navigateForward(`${navigation.home}/${navigation.dashboard}`, false);
                    }
                }
            )
            .catch((err) => {
                // this.snackBar.open(err.message, 'OK', {});
                console.log('error: ' + err);
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
