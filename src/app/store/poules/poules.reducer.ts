import {IPoules} from '../../interface/IPoules';
import {
    ADD_POULES_SUCCESS,
    FETCH_POULES_FAILURE,
    FETCH_POULES_SUCCESS,
    RESET_POULES,
    SET_POULE_ACTIVE,
    UPDATE_POULES_FAILURE,
    UPDATE_POULES_SUCCESS
} from './poules.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const defaultState: IPoules = {
    poules: [],
    totaalScoreDeelnemer: 0,
};

export function poulesReducer(state: IPoules = defaultState, action) {
    switch (action.type) {
        case FETCH_POULES_SUCCESS:
            return {...state, id: action.payload.id, display_name: action.payload.display, poules: action.payload.poules};
        case ADD_POULES_SUCCESS:
            return {...state, poules: [...state.poules, ...action.payload]};
        case SET_POULE_ACTIVE:
            return {...state, activePoule: action.payload};
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
export const getAllPoules = createSelector(getDeelnemer, (deelnemer: IPoules) => deelnemer.poules);
export const getActivePoule = createSelector(getDeelnemer, (deelnemer: IPoules) => deelnemer.activePoule);
export const getPositionInActivePoule = createSelector(getDeelnemer, (deelnemer: IPoules) => {
    if (deelnemer && deelnemer.activePoule) {
        return deelnemer.activePoule.deelnemers.find(dlnr => dlnr.id === deelnemer.id).positie;
    } else {
        return 0;
    }
});
export const getDeelnemerId = createSelector(getDeelnemer, (deelnemer: IPoules) => deelnemer.id);
export const getDisplayname = createSelector(getDeelnemer, (deelnemer: IPoules) => deelnemer.display_name);
export const getDeelnemerScore = createSelector(getDeelnemer, (deelnemer: IPoules) => {
    if (deelnemer && deelnemer.poules && deelnemer.poules.length > 0) {
        return deelnemer.poules[0].deelnemers.length > 0
            ? deelnemer.poules[0].deelnemers.find(pouleDeelnemer => pouleDeelnemer.id === deelnemer.id).totaalpunten
            : 0;
    } else {
        return 0;
    }
});
