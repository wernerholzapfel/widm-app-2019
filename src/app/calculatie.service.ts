import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CalculatieService {

    constructor() {
    }

    determineMolPunten(mol: any, aflevering: number) {
        return mol.mol ? molPunten : mol.afgevallen && mol.aflevering === aflevering ? molStrafpunten : 0;
    }

    determineWinnaarPunten(winnaar: any, aflevering: number) {
        return winnaar.winner ? winnaarPunten : winnaar.afgevallen && winnaar.aflevering === aflevering ? winnaarStrafpunten : 0;
    }

    determineAfvallerPunten(afvaller: any, aflevering: number) {
        return afvaller.afgevallen && afvaller.aflevering === aflevering ? afvallerPunten : 0;
    }

    determineTestPunten(test: any) {
        return (test.antwoord && !test.antwoord.is_niet_meer_mogelijk_sinds) ? vragenPunten : 0;
    }

    calculatePosition(deelnemer, index, deelnemers) {
        return index > 0 && deelnemer.totaalpunten === deelnemers[index - 1].totaalpunten ?
            deelnemers[index - 1].positie : index + 1;
    }
}

export const molStrafpunten = -10;
export const winnaarStrafpunten = -5;
export const afvallerPunten = 20;
export const molPunten = 20;
export const winnaarPunten = 10;
export const vragenPunten = 10;

