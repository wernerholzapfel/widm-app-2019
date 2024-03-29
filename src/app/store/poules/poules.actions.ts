import {Action} from '@ngrx/store';
import {IPoule, IPoules} from '../../interface/IPoules';

export const FETCH_POULES_IN_PROGRESS = 'FETCH_POULES_IN_PROGRESS';
export const FETCH_POULES_SUCCESS = 'FETCH_POULES_SUCCESS';
export const FETCH_POULES_FAILURE = 'FETCH_POULES_FAILURE';
export const CALCULATE_POULES = 'CALCULATE_POULES';
export const UPDATE_POULES_SUCCESS = 'UPDATE_POULES_SUCCESS';
export const UPDATE_POULES_FAILURE = 'UPDATE_POULES_FAILURE';
export const RESET_POULES = 'RESET_POULES';
export const ADD_POULES_SUCCESS = 'ADD_POULES_SUCCESS';
export const SET_POULE_ACTIVE = 'SET_POULE_ACTIVE';
export const ADD_STAND = 'ADD_STAND';

export class FetchPoulesInProgress implements Action {
    readonly type = FETCH_POULES_IN_PROGRESS;

    constructor(public payload?: IPoule) {
    }
}

export class FetchPoulesSuccess implements Action {
    readonly type = FETCH_POULES_SUCCESS;

    constructor(public payload: { poules: IPoules, activePoule: IPoule }) {
    }
}

export class AddPouleSuccess implements Action {
    readonly type = ADD_POULES_SUCCESS;

    constructor(public payload: IPoule) {
    }
}

export class AddStand implements Action {
    readonly type = ADD_STAND;

    constructor(public payload: IPoule) {
    }
}

export class SetPouleActive implements Action {
    readonly type = SET_POULE_ACTIVE;

    constructor(public payload: IPoule) {
    }
}

export class ResetPoules implements Action {
    readonly type = RESET_POULES;
}

export class CalculatePoules implements Action {
    readonly type = CALCULATE_POULES;

    constructor(public payload: {poules: IPoules, activePoule: IPoule}) {
    }
}

export class FetchPoulesFailure implements Action {
    readonly type = FETCH_POULES_FAILURE;

    constructor(public payload: any) {
    }
}



