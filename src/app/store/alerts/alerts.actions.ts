
import {IAlert} from '../../interface/IAlert';
import {Action} from '@ngrx/store';

export const DELETE_ALERT = 'DELETE_ALERT';
export const ADD_ALERT = 'ADD_ALERT';

export class DeleteAlert implements Action {
  readonly type = DELETE_ALERT;

  constructor(public payload: IAlert) {
  }
}

export class AddAlert implements Action {
  readonly type = ADD_ALERT;

  constructor(public payload: IAlert) {
  }
}
