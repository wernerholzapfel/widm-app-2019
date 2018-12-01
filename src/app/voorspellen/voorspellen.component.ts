import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../services/app/ui.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {IAppState} from '../store/store';
import {select, Store} from '@ngrx/store';
import {getActies} from '../store/acties/acties.reducer';
import {VoorspellenService} from '../services/api/voorspellen.service';
import {IKandidaat} from '../interface/IKandidaat';


export interface VoorspellingsBody {
    id?: string;
    mol?: IKandidaat;
    winnaar?: IKandidaat;
    afvaller?: IKandidaat;
    deelnemer?: any;
    aflevering?: number;
}

@Component({
    selector: 'app-voorspellen',
    templateUrl: './voorspellen.component.html',
    styleUrls: ['./voorspellen.component.scss']
})

export class VoorspellenComponent implements OnInit, OnDestroy {
    header: string;
    kandidaten: IKandidaat[];
    activeKandidaat: IKandidaat;
    selectKandidaat: boolean;
    activeIndex = 0;
    numberOfKandidaten: number;
    huidigeVoorspelling: VoorspellingsBody = {};
    voorspellingsLijst: { type: string; kandidaat?: IKandidaat }[] = [
        {type: 'mol', kandidaat: null},
        {type: 'winnaar', kandidaat: null},
        {type: 'afvaller', kandidaat: null}];
    unsubscribe: Subject<any> = new Subject();

    constructor(private uiService: UiService,
                private formBuilder: FormBuilder,
                private store: Store<IAppState>,
                private voorspellenService: VoorspellenService) {
    }

    ngOnInit() {

        this.header = 'Voorspellen';

        this.uiService.huidigeVoorspelling$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            if (response) {
                this.huidigeVoorspelling = response;
                this.setInitialKandidaat('mol', response.mol);
                this.setInitialKandidaat('afvaller', response.afvaller);
                this.setInitialKandidaat('winnaar', response.winnaar);
            }
        });

        this.store.pipe(
            takeUntil(this.unsubscribe),
            select(getActies))
            .subscribe(response => {
                if (response) {
                    this.huidigeVoorspelling.aflevering = response.voorspellingaflevering ? response.voorspellingaflevering : 1;
                }
            });
        this.uiService.kandidaten$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            this.kandidaten = response.filter(kandidaat => !kandidaat.afgevallen);
            this.activeKandidaat = this.kandidaten[0];
            this.numberOfKandidaten = this.kandidaten.length;
        });
    }

    activateKandidaat(newIndex) {
        this.activeIndex = newIndex;
        this.activeKandidaat = this.kandidaten[newIndex];
    }

    saveKandidaat(voorspellingsType: string) {
        this.voorspellingsLijst.find(vp => vp.type === voorspellingsType).kandidaat = this.activeKandidaat;
        this.huidigeVoorspelling[voorspellingsType] = this.activeKandidaat;
        this.setSelectedState(voorspellingsType, false);
        this.submitVoorspellingen();
    }

    editKandidaat(voorspellingsType: string) {
        this.setActiveIndex(voorspellingsType);
        this.setSelectedState(voorspellingsType, true);
    }

    cancelEditKandidaat(voorspellingsType: string) {
        this.setActiveIndex(voorspellingsType);
        this.setSelectedState(voorspellingsType, false);
    }

    setInitialKandidaat(voorspellingsType: string, kandidaat: any) {
        this.voorspellingsLijst.find(item => item.type === voorspellingsType).kandidaat = kandidaat;
        this.huidigeVoorspelling[voorspellingsType] = kandidaat;
    }

    submitVoorspellingen() {
        // if (this.nieuweRonde) {
        //     this.voorspelling.get('id').disable();
        // }

        console.log(this.huidigeVoorspelling);
        this.voorspellenService.saveVoorspelling(Object.assign({}, this.huidigeVoorspelling)).subscribe(response => {
            this.uiService.presentToast('Opslaan is gelukt');
            // window['plugins'].OneSignal.sendTag('laatsteVoorspelling', this.voorspelling.get('aflevering').value);
        }, error => {
            // todo error message er uithalen en tonen.
            this.uiService.presentToast('Er is iets misgegaan.');
        });
    }

    private setActiveIndex(voorspellingsType: string) {
        const newIndex = this.kandidaten.findIndex(
            kandidaat => kandidaat.id === this.voorspellingsLijst.find(
                vp => vp.type === voorspellingsType).kandidaat.id);

        this.activeIndex = newIndex > 0 ? newIndex : 0;
        this.activeKandidaat = this.kandidaten[this.activeIndex];
    }

    private setSelectedState(voorspellingsType: string, state: boolean) {
        this.voorspellingsLijst.find(item => item.type === voorspellingsType).selected = state;
        this.selectKandidaat = state;
    }


    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }
}


