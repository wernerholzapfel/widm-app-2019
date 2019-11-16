import {IPoules} from '../../interface/IPoules';
import {
    ADD_POULES_SUCCESS,
    FETCH_POULES_FAILURE,
    FETCH_POULES_SUCCESS,
    RESET_POULES,
    UPDATE_POULES_FAILURE,
    UPDATE_POULES_SUCCESS
} from './poules.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export function poulesReducer(state: IPoules, action) {
    switch (action.type) {
        case FETCH_POULES_SUCCESS:
            return {...action.payload};
        case ADD_POULES_SUCCESS:
            return {...state, poules: [...state.poules, ...action.payload]};
        case FETCH_POULES_FAILURE:
            return {...state};
        case UPDATE_POULES_SUCCESS:
            return {...action.payload};
        case UPDATE_POULES_FAILURE:
            return {...state};
        case RESET_POULES:
            return {};
        default:
            return {...state};
    }
}

export const getDeelnemer = createFeatureSelector<IPoules>('poules');
export const getPoules = createSelector(getDeelnemer, (deelnemer: IPoules) => deelnemer.poules);
export const getDeelnemerId = createSelector(getDeelnemer, (deelnemer: IPoules) => deelnemer.id);
export const getDisplayname = createSelector(getDeelnemer, (deelnemer: IPoules) => deelnemer.display_name);
export const getDeelnemerScore = createSelector(getDeelnemer,
    (deelnemer: IPoules) => deelnemer && deelnemer.poules && deelnemer.poules.length > 0
        ? deelnemer.poules[0].deelnemers.find(pouleDeelnemer => pouleDeelnemer.id === deelnemer.id)
        : null);
