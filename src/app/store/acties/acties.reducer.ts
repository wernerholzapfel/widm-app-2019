import {IActies} from '../../interface/IActies';
import {
  FETCH_ACTIES_FAILURE,
  FETCH_ACTIES_SUCCESS,
  UPDATE_ACTIES_FAILURE,
  UPDATE_ACTIES_SUCCESS
} from './acties.actions';
import {createFeatureSelector, State} from '@ngrx/store';

export function actiesReducer(state: IActies, action) {
  switch (action.type) {
    case FETCH_ACTIES_SUCCESS:
      return {...action.payload};
    case FETCH_ACTIES_FAILURE:
      return {...state};
    case UPDATE_ACTIES_SUCCESS:
      return {...action.payload};
    case UPDATE_ACTIES_FAILURE:
      return {...state};
    default:
      return {...state};
  }
}

export const getActies = createFeatureSelector<IActies>('acties');
