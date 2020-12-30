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
import {mergeMap, skipWhile, take, takeUntil} from 'rxjs/operators';
import {IPoule} from '../../interface/IPoules';


@Component({
    selector: 'app-adddeelnemer',
    templateUrl: './adddeelnemer.component.html',
    styleUrls: ['./adddeelnemer.component.scss']
})
export class AdddeelnemerComponent implements OnInit, OnDestroy {

    unsubscribe = new Subject<void>();
    poule: IPoule;

    constructor(private uitnodigingenService: UitnodigingenService,
                private uiService: UiService,
                private route: ActivatedRoute,
                private plt: Platform,
                private socialSharing: SocialSharing,
                private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.store.pipe(select(getActivePoule))
            .pipe(skipWhile(response => !response))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(activePoule => {
                this.poule = activePoule;
            });
    }


    shareInvite(personal: boolean) {
        const shareMessage = `Ik nodig je uit voor de poule ${this.poule.poule_name} voor 'Wie is de Molloot'.
            Neem deel aan de poule met deze code: ${this.poule.pouleInvitations[0].id}

            Download 'Wie is de Molloot' hier! App store: https://apps.apple.com/nl/app/molloot/id1314512869
            Google play: https://play.google.com/store/apps/details?id=com.wernerholzapfel.mollotenapp`;
        const shareSubject = 'Wie is de Molloot';
        if (this.plt.is('cordova')) {
            this.socialSharing.share(shareMessage, shareSubject
            ).then(item => {
            });
        } else {
            console.log(shareSubject);
            console.log(shareMessage);
        }
    }


    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
