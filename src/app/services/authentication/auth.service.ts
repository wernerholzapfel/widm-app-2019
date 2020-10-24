import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/auth';
import {UiService} from '../app/ui.service';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {ResetPoules, SetPouleActive} from '../../store/poules/poules.actions';
import IdTokenResult = firebase.auth.IdTokenResult;

@Injectable()
export class AuthService {
    public user$: Observable<firebase.User>;
    public isAdmin = false;

    constructor(private _firebaseAuth: AngularFireAuth, private uiService: UiService, private store: Store<IAppState>) {
        this.user$ = _firebaseAuth.user;

    }

    signInRegular(email, password) {
        return this._firebaseAuth.signInWithEmailAndPassword(email, password);
    }

    signUpRegular(email, password, displayName) {
        return this._firebaseAuth.createUserWithEmailAndPassword(email, password);
    }

    isLoggedIn() {
        return this._firebaseAuth.authState;
    }

    logout() {
        this._firebaseAuth.signOut()
            .then(response => {
                this.store.dispatch(new ResetPoules());
                this.uiService.huidigeVoorspelling$.next(null);
                // this.uiService.activePouleIndex$.next(null); // todo poules
                // this.uiService.poules$.next(null); // todo empty store
                this.store.dispatch(new SetPouleActive(null));
            });
    }

    getToken(): Observable<string> {
        return this._firebaseAuth.idToken;
    }

    getTokenResult(): Observable<IdTokenResult> {
        return this._firebaseAuth.idTokenResult;
    }

    sendPasswordResetEmail(email: string): Promise<any> {
        return this._firebaseAuth.sendPasswordResetEmail(email);
    }


}
