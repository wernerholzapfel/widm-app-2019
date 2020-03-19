import {from as observableFrom, of as observableOf} from 'rxjs';

import {catchError, switchMap} from 'rxjs/operators';


import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {FETCH_ACTIES_IN_PROGRESS, FetchActiesFailure, FetchActiesSuccess} from './acties.actions';
import {AddAlert} from '../alerts/alerts.actions';
import {ActiesService} from '../../services/api/acties.service';

@Injectable()
export class ActiesEffects {

    @Effect()
    fetchActiesInProgress$ = this.actions$.pipe(
        ofType(FETCH_ACTIES_IN_PROGRESS),
        switchMap((action) => {
            return this.actiesService
                .getActies().pipe(
                    switchMap(acties =>
                        observableOf(new FetchActiesSuccess(acties))
                    ),
                    catchError(err =>
                        observableFrom([
                            new FetchActiesFailure(err),
                            new AddAlert({type: 'danger', message: 'Het updaten van de acties is mislukt.', err: err})
                        ])));
        }));
    constructor(private actions$: Actions,
                private actiesService: ActiesService) {
    }
}
