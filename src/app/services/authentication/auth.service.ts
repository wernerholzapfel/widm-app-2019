import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/auth';
import {UiService} from '../app/ui.service';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {ResetPoules, SetPouleActive} from '../../store/poules/poules.actions';

@Injectable()
export class AuthService {
    public user$: Observable<firebase.User>;
    public isAdmin = false;

    constructor(private _firebaseAuth: AngularFireAuth, private uiService: UiService, private store: Store<IAppState>) {
        this.user$ = _firebaseAuth.authState;

    }

    signInRegular(email, password) {
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
        return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
    }

    updateProfile(displayName: string) {
        this.getToken().then(response => {
            response.updateProfile({displayName: displayName});
        });
    }

    signUpRegular(email, password, displayName) {
        return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    isLoggedIn() {
        return this._firebaseAuth.authState;
    }

    logout() {
        this._firebaseAuth.auth.signOut()
            .then(response => {
                this.store.dispatch(new ResetPoules());
                this.uiService.huidigeVoorspelling$.next(null);
                // this.uiService.activePouleIndex$.next(null); // todo poules
                // this.uiService.poules$.next(null); // todo empty store
                this.store.dispatch(new SetPouleActive(null));
            });
    }

    getToken(): Promise<any> {
        if (this._firebaseAuth.auth.currentUser) {
            return this._firebaseAuth.auth.currentUser.getIdToken(true);
        } else {
            return Promise.resolve(false);
        }
    }

    getTokenResult(): Promise<any> {
        if (this._firebaseAuth.auth.currentUser) {
            return this._firebaseAuth.auth.currentUser.getIdTokenResult(true);
        } else {
            return Promise.resolve(false);
        }
    }

    sendPasswordResetEmail(email: string): Promise<any> {
        return this._firebaseAuth.auth.sendPasswordResetEmail(email);
    }


}
