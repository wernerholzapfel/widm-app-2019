import {from as observableFrom, of as observableOf} from 'rxjs';
import {catchError, map, switchMap, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    CALCULATE_POULES,
    CalculatePoules,
    FETCH_POULES_IN_PROGRESS,
    FetchPoulesFailure,
    FetchPoulesInProgress,
    FetchPoulesSuccess
} from './poules.actions';
import {AddAlert} from '../alerts/alerts.actions';
import {PoulesService} from '../../services/api/poules.service';
import {CalculatieService, vragenPunten} from '../../calculatie.service';

@Injectable()
export class PoulesEffects {

    @Effect()
    fetchPoulesInProgress$ = this.actions$.pipe(
        ofType<FetchPoulesInProgress>(FETCH_POULES_IN_PROGRESS),
        switchMap((action) => {
            return this.poulesService
                .getPoules().pipe(take(1),
                        switchMap(response =>
                        observableOf(new CalculatePoules(response))
                    ),
                    catchError(err =>
                        observableFrom([
                            new FetchPoulesFailure(err),
                            new AddAlert({type: 'danger', message: 'Het ophalen van de poules is mislukt.', err: err})
                        ])));
        }));

    @Effect()
    calculatePoules = this.actions$.pipe(
        ofType<CalculatePoules>(CALCULATE_POULES),
        map(action => ({
            ...action.payload,
            poules: action.payload.poules
                .map(poule => ({
                    ...poule,
                    deelnemers: poule.deelnemers
                        .map(deelnemer => ({
                            ...deelnemer,
                            voorspellingen: deelnemer.voorspellingen
                                .map(voorspelling => ({
                                    ...voorspelling,
                                    mol: Object.assign(voorspelling.mol,
                                        {punten: this.calculatieService.determineMolPunten(voorspelling.mol, voorspelling.aflevering)}),
                                    winnaar: Object.assign(voorspelling.winnaar,
                                        {punten: this.calculatieService.determineWinnaarPunten(voorspelling.winnaar, voorspelling.aflevering)}),
                                    afvaller: Object.assign(voorspelling.afvaller,
                                        {punten: this.calculatieService.determineAfvallerPunten(voorspelling.afvaller, voorspelling.aflevering)}),
                                })),
                            tests: deelnemer.tests
                                .map(test => ({
                                    ...test,
                                    punten: this.calculatieService.determineTestPunten(test)
                                }))
                        }))
                        .map(deelnemer => {
                            return ({
                                ...deelnemer,
                                testpunten: deelnemer.tests.filter(test => test.punten > 0).length * vragenPunten,
                                molpunten: deelnemer.voorspellingen.reduce((punten, voorspelling) => {
                                    return voorspelling.mol.punten + punten;
                                }, 0),
                                afvallerpunten: deelnemer.voorspellingen.reduce((punten, voorspelling) => {
                                    return voorspelling.afvaller.punten + punten;
                                }, 0),
                                winnaarpunten: deelnemer.voorspellingen.reduce((punten, voorspelling) => {
                                    return voorspelling.winnaar.punten + punten;
                                }, 0),
                                voorspellingen: deelnemer.voorspellingen
                                    .map(voorspelling => ({
                                        ...voorspelling,
                                        punten: voorspelling.mol.punten + voorspelling.afvaller.punten + voorspelling.winnaar.punten
                                    }))
                            });
                        })
                        .map(deelnemer => ({
                            ...deelnemer,
                            totaalpunten: deelnemer.afvallerpunten + deelnemer.molpunten + deelnemer.winnaarpunten + deelnemer.testpunten
                        }))
                        .sort((a, b) => b.totaalpunten - a.totaalpunten)
                        .map((deelnemer, index, deelnemers) => Object.assign(deelnemer, {
                            positie: this.calculatieService.calculatePosition(deelnemer, index, deelnemers)
                        }))
                }))
        })),
        switchMap(response => observableOf(new FetchPoulesSuccess(response))),
        catchError(err =>
            observableFrom([
                new FetchPoulesFailure(err),
                new AddAlert({type: 'danger', message: 'Het bijwerken van de poules is mislukt.', err: err})
            ])));

    constructor(private actions$: Actions,
                private poulesService: PoulesService, private calculatieService: CalculatieService) {
    }
}
