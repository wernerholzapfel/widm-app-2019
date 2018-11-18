import {from as observableFrom, of as observableOf} from 'rxjs';

import {catchError, map, switchMap} from 'rxjs/operators';


import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {
  FETCH_ACTIES_IN_PROGRESS,
  FetchActiesFailure,
  FetchActiesInProgress,
  FetchActiesSuccess,
  UPDATE_ACTIES_IN_PROGRESS,
  UpdateActiesFailure,
  UpdateActiesInProgress,
  UpdateActiesSuccess
} from './acties.actions';
import {AddAlert} from '../alerts/alerts.actions';
import {ActiesService} from '../../services/api/acties.service';

@Injectable()
export class ActiesEffects {

  @Effect()
  fetchActiesInProgress$ = this.actions$
    .ofType<FetchActiesInProgress>(FETCH_ACTIES_IN_PROGRESS).pipe(
    switchMap(() => {
      return this.actiesService
        .getActies().pipe(
        switchMap(response =>
          observableOf(new FetchActiesSuccess(response))
        ),
        catchError(err =>
          observableFrom([
            new FetchActiesFailure(err),
            new AddAlert({type: 'danger', message: 'Het updaten van de acties is mislukt.', err: err})
          ])));
    }));

  @Effect()
  updateActiesInProgress$ = this.actions$
    .ofType<UpdateActiesInProgress>(UPDATE_ACTIES_IN_PROGRESS)
    .pipe(
    map(action => action.payload),
    switchMap(acties => {
      return this.actiesService
        .saveActies(acties).pipe(
        switchMap(() =>
          observableFrom([
            new UpdateActiesSuccess(acties),
            new AddAlert({type: 'success', message: 'Opslaan van acties gelukt', err: undefined})
          ])),
        catchError(err =>
          observableFrom([
            new UpdateActiesFailure(err),
            new AddAlert({type: 'danger', message: 'Het updaten van de acties is mislukt.', err: err})
          ])));
    }));

  constructor(private actions$: Actions,
              private actiesService: ActiesService) {
  }
}
