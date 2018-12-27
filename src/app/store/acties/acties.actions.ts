import {Action} from '@ngrx/store';
import {IActies} from '../../interface/IActies';

export const FETCH_ACTIES_IN_PROGRESS = 'FETCH_ACTIES_IN_PROGRESS';
export const FETCH_ACTIES_SUCCESS = 'FETCH_ACTIES_SUCCESS';
export const FETCH_ACTIES_FAILURE = 'FETCH_ACTIES_FAILURE';
export const UPDATE_ACTIES_IN_PROGRESS = 'UPDATE_ACTIES_IN_PROGRESS';
export const UPDATE_ACTIES_SUCCESS = 'UPDATE_ACTIES_SUCCESS';
export const UPDATE_ACTIES_FAILURE = 'UPDATE_ACTIES_FAILURE';

export class FetchActiesInProgress implements Action {
  readonly type = FETCH_ACTIES_IN_PROGRESS;

  constructor() {}
}

export class FetchActiesSuccess implements Action {
  readonly type = FETCH_ACTIES_SUCCESS;

  constructor(public payload: IActies) {}
}

export class FetchActiesFailure implements Action {
  readonly type = FETCH_ACTIES_FAILURE;

  constructor(public payload: any) {}
}


export class UpdateActiesSuccess implements Action {
  readonly type = UPDATE_ACTIES_SUCCESS;

  constructor(public payload: IActies) {}
}

export class UpdateActiesFailure implements Action {
  readonly type = UPDATE_ACTIES_FAILURE;

  constructor(public payload: any) {}
}


