import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/app/ui.service';
import {IUitnodigingResponse, UitnodigingenService} from '../../services/api/uitnodigingen.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {navigation} from '../../constants/navigation.constants';
import {FetchPoulesInProgress} from '../../store/poules/poules.actions';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

@Component({
    selector: 'app-accept-invite',
    templateUrl: './accept-invite.component.html',
    styleUrls: ['./accept-invite.component.scss']
})
export class AcceptInviteComponent implements OnInit, OnDestroy {

    uitnodigingen: IUitnodigingResponse[];
    unsubscribe: Subject<void> = new Subject<void>();

    constructor(private uiService: UiService,
                private uitnodigingenService: UitnodigingenService,
                private router: Router,
                private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.uiService.uitnodigingen$.pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            this.uitnodigingen = response;
            if (this.uitnodigingen.length === 0) {
                this.router.navigate([`${navigation.poules}/${navigation.poule}`]);
            }
        });
    }

    acceptInvite(uitnodiging: IUitnodigingResponse) {
        this.uitnodigingenService.acceptInvite({poule: {id: uitnodiging.poule.id}, uitnodigingId: uitnodiging.id}).subscribe(response => {
            this.uiService.uitnodigingen$
                .next(this.uitnodigingen.filter(item => item.id !== uitnodiging.id));
            this.store.dispatch(new FetchPoulesInProgress());
        });
    }

    declineInvite(uitnodiging: IUitnodigingResponse) {
        this.uitnodigingenService.declineInvite({poule: {id: uitnodiging.poule.id}, uitnodigingId: uitnodiging.id}).subscribe(response => {
            this.uiService.uitnodigingen$
                .next(this.uitnodigingen.filter(item => item.id !== uitnodiging.id));
        });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
