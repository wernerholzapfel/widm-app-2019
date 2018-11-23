import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/app/ui.service';
import {takeUntil} from 'rxjs/operators';
import {combineLatest, Subject} from 'rxjs';

@Component({
    selector: 'app-poule',
    templateUrl: './poule.component.html',
    styleUrls: ['./poule.component.scss']
})
export class PouleComponent implements OnInit, OnDestroy {
    unsubscribe: Subject<void> = new Subject<void>();
    activePoule: any;
    isPouleAdmin: boolean;
    deelnemerId: boolean;

    constructor(private uiService: UiService) {
    }

    ngOnInit() {
        combineLatest(this.uiService.activePoule$, this.uiService.deelnemerId$)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(
                ([activePoule, deelnemerId]) => {
                    this.deelnemerId = deelnemerId;
                    this.activePoule = activePoule;
                    this.isPouleAdmin = !!activePoule.admins.find(admin => admin.id === deelnemerId);
                });
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }

}
