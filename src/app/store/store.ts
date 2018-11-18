import {ActionReducerMap} from '@ngrx/store';
import {IAlert} from '../interface/IAlert';
import {alertReducer} from './alerts/alerts.reducers';
import {IActies} from '../interface/IActies';
import {actiesReducer} from './acties/acties.reducer';
import {IPoules} from '../interface/IPoules';
import {poulesReducer} from './poules/poules.reducer';


export interface IAppState {
    alerts: IAlert[];
    acties: IActies;
    poules: IPoules;
}

export const reducers: ActionReducerMap<IAppState> = {
    alerts: alertReducer,
    acties: actiesReducer,
    poules: poulesReducer
};
