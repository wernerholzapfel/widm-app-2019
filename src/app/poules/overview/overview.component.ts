import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/app/ui.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {navigation} from '../../constants/navigation.constants';
import {IPoule} from '../../interface/IPoules';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getAllPoules, getDeelnemerId} from '../../store/poules/poules.reducer';
import {IAppState} from '../../store/store';
import {FetchPoulesInProgress, SetPouleActive} from '../../store/poules/poules.actions';
import {AlertController} from '@ionic/angular';
import {UitnodigingenService} from '../../services/api/uitnodigingen.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
    unsubscribe = new Subject<void>();
    poules: any[] = [];
    deelnemerId: string;

    constructor(private uiService: UiService,
                private router: Router,
                private store: Store<IAppState>,
                private uitnodigingenService: UitnodigingenService,
                private alertController: AlertController) {
    }

    ngOnInit() {
        this.store.pipe(
            select(getDeelnemerId),
            takeUntil(this.unsubscribe))
            .subscribe(response => {
                this.deelnemerId = response;
            });

        this.store.pipe(select(getAllPoules)).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            this.poules = response;
        });
    }

    navigateToPoule(poule: IPoule, index: number) {
        this.store.dispatch(new SetPouleActive(poule));
        this.router.navigate([`${navigation.poules}/${navigation.poule}`]);
    }

    goToAddPoule() {
        this.router.navigate([`${navigation.poules}/${navigation.addpoule}`]);
    }

    async joinPoule() {
        const alert = await this.alertController.create({
            header: 'Doe mee aan een poule',
            message: '',
            inputs: [
                {
                    name: 'invitationId',
                    type: 'text',
                    placeholder: 'Code van de uitnodiging',
                },
            ],
            buttons: [
                {
                    text: 'Annuleren',
                    handler: (data) => {
                    }
                },
                {
                    text: 'Doe mee',
                    handler: (data) => {
                        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.invitationId)) {
                            this.uitnodigingenService.joinPoule(data.invitationId).subscribe(response => {
                                this.uiService.presentToast('Je neemt nu deel aan de poule');
                                this.store.dispatch(new FetchPoulesInProgress(response));
                                this.router.navigate([`${navigation.poules}/${navigation.poule}`]);
                            }, error => {
                                this.uiService.presentToast('De code is niet geaccepteerd', 'danger');
                            });
                        } else {
                            alert.message = 'dit is geen geldig code';
                            return false;
                        }
                    }
                }
            ],
        });

        await alert.present();
    }

    determinePositionFromUser(poule: any): number {
        if (poule && poule.deelnemers && this.deelnemerId) {
            const deelnemerInList = poule.deelnemers.find(deelnemer => deelnemer.id === this.deelnemerId);
            return deelnemerInList ? deelnemerInList.positie : null;
        } else {
            return null;
        }

    }

    ngOnDestroy() {
        this.unsubscribe.next(undefined);
        this.unsubscribe.complete();
    }
}
