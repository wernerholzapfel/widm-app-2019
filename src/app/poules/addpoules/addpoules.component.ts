import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PoulesService} from '../../services/api/poules.service';
import {UiService} from '../../services/app/ui.service';
import {navigation} from '../../constants/navigation.constants';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {getDeelnemerId} from '../../store/poules/poules.reducer';
import {AddPouleSuccess} from '../../store/poules/poules.actions';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-addpoules',
    templateUrl: './addpoules.component.html',
    styleUrls: ['./addpoules.component.scss']
})
export class AddpoulesComponent implements OnInit, OnDestroy {
    @ViewChild('createPouleForm') createPouleForm: NgForm;
    unsubscribe: Subject<void> = new Subject<void>();
    deelnemerId: string;
    isLoading: boolean;

    constructor(private poulesService: PoulesService,
                private uiService: UiService,
                private router: Router,
                private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.store.pipe(select(getDeelnemerId)).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
            console.log('deelnemerId');
            console.log(response);
            this.deelnemerId = response;
        });
    }

    createPoule() {
        this.isLoading = true;
        const currentUser = {id: this.deelnemerId};
        this.poulesService.createPoule({
            poule_name: this.createPouleForm.value.name,
            deelnemers: [currentUser],
            admins: [currentUser]
        }).subscribe(response => {
                this.uiService.presentToast(`Poule ${this.createPouleForm.value.name} aangemaakt`, 'tertiary', 4000);
                this.isLoading = false;
                this.store.dispatch(new AddPouleSuccess(response));
                this.router.navigate([`${navigation.poules}/${navigation.adddeelnemer}`]);
            }, error1 => {
                this.isLoading = false;
                this.uiService.presentToast(`Er is iets misgegaan bij het aanmaken van de poule`);
            }
        );
    }

    ngOnDestroy() {
        this.unsubscribe.next(undefined);
        this.unsubscribe.complete();
    }
}
