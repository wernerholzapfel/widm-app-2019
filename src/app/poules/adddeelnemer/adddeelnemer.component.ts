import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UiService} from '../../services/app/ui.service';
import {UitnodigingenService} from '../../services/api/uitnodigingen.service';
import {ActivatedRoute} from '@angular/router';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Platform} from '@ionic/angular';
import {getActivePoule} from '../../store/poules/poules.reducer';
import {IAppState} from '../../store/store';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {mergeMap, skipWhile, take} from 'rxjs/operators';
import {IPoule} from '../../interface/IPoules';


@Component({
    selector: 'app-adddeelnemer',
    templateUrl: './adddeelnemer.component.html',
    styleUrls: ['./adddeelnemer.component.scss']
})
export class AdddeelnemerComponent implements OnInit, OnDestroy {

    @ViewChild('form', {static: false}) form: NgForm;

    unsubscribe = new Subject<void>();
    poule: IPoule;
    uitnodigingen: any[];

    constructor(private uitnodigingenService: UitnodigingenService,
                private uiService: UiService,
                private route: ActivatedRoute,
                private plt: Platform,
                private socialSharing: SocialSharing,
                private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.store.pipe(select(getActivePoule)).pipe(skipWhile(response => !response)).pipe(mergeMap(activePoule => {
            this.poule = activePoule;
            return this.uitnodigingenService.getUitnodigingenByPoule(activePoule.id).pipe(take(1));
        })).subscribe(response => {
            this.uitnodigingen = response.sort((a, b) => {
                return a.isDeclined - b.isDeclined || a.isAccepted - b.isAccepted;
            });
        });
    }


    addDeelnemer() {
        this.uitnodigingenService.addDeelnemer({
            poule: {id: this.poule.id},
            uniqueIdentifier: this.form.value.email
        }).subscribe(() => {
            this.uitnodigingen = [{uniqueIdentifier: this.form.value.email}, ...this.uitnodigingen];
                this.form.reset();
            }
        );
    }

    shareInvite(personal: boolean) {
        this.socialSharing.share(
            `Ik heb je uitgenodigd voor 'Wie is de Molloot'. Download het spel hier! App store: https://apps.apple.com/nl/app/molloot/id1314512869
            Google play: https://play.google.com/store/apps/details?id=com.wernerholzapfel.mollotenapp`,
            'Wie is de Molloot').then(item => {
        });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
