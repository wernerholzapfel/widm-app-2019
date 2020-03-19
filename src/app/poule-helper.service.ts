import {Injectable} from '@angular/core';
import {CalculatieService} from './calculatie.service';

@Injectable({
    providedIn: 'root'
})
export class PouleHelperService {

    constructor(private calculatieService: CalculatieService) {
    }

    determineDeelnemers(deelnemers: any[], deelnemerId) {
        const top25 = deelnemers.slice(0, 25);
        if (top25.find(item => item.id === deelnemerId)) {
            return top25;
        } else {
            return [...top25, deelnemers.find(item => item.id === deelnemerId)];
        }
    }

    transformDeelnemers(arr) {
        // remove duplicates // sort list // add position
        const s: Set<any> = new Set(arr);
        const verwerkteDeelnemers: Set<string> = new Set();
        const nieuweLijst = new Set();
        s.forEach(deelnemer => {
            if (!verwerkteDeelnemers.has(deelnemer.id)) {
                verwerkteDeelnemers.add(deelnemer.id);
                nieuweLijst.add(deelnemer);
            }
        });
        const it = nieuweLijst.values();
        const nieuweDeelnemersLijst: any[] = Array.from(it);
        return nieuweDeelnemersLijst
            .sort((a, b) => b.totaalpunten - a.totaalpunten)
            .reduce((accumulator, currentValue, index) => {
                return [...accumulator, Object.assign({}, currentValue, {
                    positie: this.calculatieService.calculatePosition(currentValue, index, accumulator)
                })];
            }, []);
    }
}
