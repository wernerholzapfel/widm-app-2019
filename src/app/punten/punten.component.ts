import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../services/app/ui.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CalculatieService} from '../calculatie.service';

@Component({
    selector: 'app-punten',
    templateUrl: './punten.component.html',
    styleUrls: ['./punten.component.scss']
})
export class PuntenComponent implements OnInit, OnDestroy {

    unsubscribe: Subject<void> = new Subject<void>();
    testAfleveringen: any[];
    voorspellingen: any[];
    activeSegment = 'voorspellingen';

    constructor(private uiService: UiService, private calculatieService: CalculatieService) {
    }

    ngOnInit() {

        this.uiService.tests$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            if (response) {
                this.testAfleveringen = response.map(test => ({
                    ...test,
                    punten: this.calculatieService.determineTestPunten(test)
                })).reduce(function(rv, x) {
                        (rv[x['aflevering']] = rv[x['aflevering']] || []).push(x);
                        return rv;
                    }, []);
            }
        });

        this.uiService.voorspellingen$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            if (response) {
                this.voorspellingen = response.map(voorspelling => ({
                    ...voorspelling,
                    mol: Object.assign(voorspelling.mol,
                        {punten: this.calculatieService.determineMolPunten(voorspelling.mol, voorspelling.aflevering)}),
                    winnaar: Object.assign(voorspelling.winnaar,
                        {punten: this.calculatieService.determineWinnaarPunten(voorspelling.winnaar, voorspelling.aflevering)}),
                    afvaller: Object.assign(voorspelling.afvaller,
                        {punten: this.calculatieService.determineAfvallerPunten(voorspelling.afvaller, voorspelling.aflevering)}),
                }));
                console.log(this.voorspellingen);
            }
        });
    }

    segmentChanged($event) {
        this.activeSegment = $event.detail.value;
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }
}
