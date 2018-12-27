import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../services/app/ui.service';
import {takeUntil} from 'rxjs/operators';
import {combineLatest, Subject} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {IAppState} from '../store/store';
import {select, Store} from '@ngrx/store';
import {getActies} from '../store/acties/acties.reducer';
import {VoorspellenService} from '../services/api/voorspellen.service';
import {IKandidaat} from '../interface/IKandidaat';
import {getDeelnemerId} from '../store/poules/poules.reducer';
import {NavController} from '@ionic/angular';
import {navigation} from '../constants/navigation.constants';
import {KandidatenService} from '../services/api/kandidaten.service';
import {environment} from '../../environments/environment';


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
    voorspellingsType: string;
    header: string;
    kandidaten: IKandidaat[];
    activeKandidaat: IKandidaat;
    selectKandidaat: boolean;
    activeIndex = 0;
    numberOfKandidaten: number;
    huidigeVoorspelling: VoorspellingsBody = {};
    isBusy = false;
    voorspellingsLijst: { type: string; kandidaat?: IKandidaat, selected?: boolean }[] = [
        {type: 'mol', kandidaat: null},
        {type: 'winnaar', kandidaat: null},
        {type: 'afvaller', kandidaat: null}];
    unsubscribe: Subject<any> = new Subject();
    constructor(private uiService: UiService,
                private formBuilder: FormBuilder,
                private store: Store<IAppState>,
                private voorspellenService: VoorspellenService,
                private kandidatenService: KandidatenService,
                private navCtrl: NavController) {
    }

    ngOnInit() {

        this.header = 'Voorspellen';


        combineLatest(this.uiService.huidigeVoorspelling$,
            this.store.pipe(select(getActies)))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([huidigevoorspellingResponse, acties]) => {
                if (acties) {
                    this.huidigeVoorspelling.aflevering = acties.voorspellingaflevering ? acties.voorspellingaflevering : 1;
                }
                if (huidigevoorspellingResponse && acties) {
                    console.log('voorspellingaflevering: ' + acties.voorspellingaflevering);
                    console.log('huidigevoorspelling: ' + huidigevoorspellingResponse.aflevering);
                    this.huidigeVoorspelling = Object.assign({}, huidigevoorspellingResponse);
                    this.huidigeVoorspelling.aflevering = acties.voorspellingaflevering ? acties.voorspellingaflevering : 1;
                    if (acties.voorspellingaflevering !== huidigevoorspellingResponse.aflevering) {
                        delete this.huidigeVoorspelling.id;
                    }
                    this.setInitialKandidaat('mol', huidigevoorspellingResponse.mol);
                    this.setInitialKandidaat('afvaller', huidigevoorspellingResponse.afvaller);
                    this.setInitialKandidaat('winnaar', huidigevoorspellingResponse.winnaar);
                }
            });

        this.store.pipe(
            select(getDeelnemerId),
            takeUntil(this.unsubscribe))
            .subscribe(deelnemerId => {
                if (deelnemerId) {
                    this.huidigeVoorspelling.deelnemer = {id: deelnemerId};
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
        this.submitVoorspellingen(false, voorspellingsType);
    }

    editKandidaat(voorspellingsType: string) {
        this.voorspellingsType = voorspellingsType;
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

    submitVoorspellingen(final: boolean, voorspellingsType) {
        this.isBusy = true;
        console.log(this.huidigeVoorspelling);
        this.voorspellenService.saveVoorspelling(Object.assign({}, this.huidigeVoorspelling)).subscribe(response => {
            this.uiService.huidigeVoorspelling$.next(Object.assign({}, response));
            this.huidigeVoorspelling.id = response.id;
            if (this.huidigeVoorspelling.mol &&
                !this.huidigeVoorspelling.mol.afgevallen &&
                this.huidigeVoorspelling.afvaller &&
                this.huidigeVoorspelling.winnaar) {
                this.uiService.voorspellingAfgerond$.next(true);
                if (environment.production) {
                    window['plugins'].OneSignal.sendTag('laatsteVoorspelling', this.huidigeVoorspelling.aflevering);
                }
            }
            this.uiService.presentToast('Opslaan is gelukt');
            if (voorspellingsType) {
                this.setSelectedState(voorspellingsType, false);
            }
            if (final) {
                this.navCtrl.navigateForward(`${navigation.home}`);
            }
            this.isBusy = false;

        }, error => {
            // todo error message er uithalen en tonen.
            this.uiService.presentToast('Er is iets misgegaan.');
            this.isBusy = false;

        });
    }

    private setActiveIndex(voorspellingsType: string) {
        const vorigeVoorspelling = this.voorspellingsLijst.find(vp => vp.type === voorspellingsType);
        if (vorigeVoorspelling.kandidaat && !vorigeVoorspelling.kandidaat.afgevallen) {
            this.activeIndex = this.kandidaten.findIndex(
                kandidaat => kandidaat.id === this.voorspellingsLijst.find(
                    vp => vp.type === voorspellingsType).kandidaat.id);
        } else {
            this.activeIndex = 0;
        }
        this.activeKandidaat = this.kandidaten[this.activeIndex];


    }

    private setSelectedState(voorspellingsType: string, state: boolean) {
        this.voorspellingsLijst.find(item => item.type === voorspellingsType).selected = state;
        this.selectKandidaat = state;
    }


    ngOnDestroy() {
        this.unsubscribe.next();
    }
}


