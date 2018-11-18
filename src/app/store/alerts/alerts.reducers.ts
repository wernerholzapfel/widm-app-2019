import {IAlert} from '../../interface/IAlert';
import {ADD_ALERT, DELETE_ALERT} from './alerts.actions';

export function alertReducer(state: IAlert[] = [], action) {
  switch (action.type) {
    case ADD_ALERT:
      return [...state, action.payload];
    case DELETE_ALERT:
      return [...state.filter(t => t !== action.payload)];
    default:
      return [...state];
  }
}
