import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/app/ui.service';
import {takeUntil} from 'rxjs/operators';
import {combineLatest, Subject} from 'rxjs';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {navigation} from '../../constants/navigation.constants';

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

    constructor(private uiService: UiService, private navCtrl: NavController, private route: ActivatedRoute) {
    }

    ngOnInit() {

        // this.uiService.activePoule$.pipe(takeUntil(this.unsubscribe)).subscribe(activePoule => {
        //     this.deelnemerId = this.uiService.deelnemerId$.getValue();
        //     this.activePoule = activePoule;
        //     this.isPouleAdmin = !!activePoule.admins.find(admin => admin.id === this.deelnemerId);
        // });
        combineLatest(this.uiService.activePoule$, this.uiService.deelnemerId$)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(
                ([activePoule, deelnemerId]) => {
                    if (activePoule && deelnemerId) {
                        this.deelnemerId = deelnemerId;
                        this.activePoule = activePoule;
                        this.isPouleAdmin = !!activePoule.admins.find(admin => admin.id === deelnemerId);
                    }
                });
    }

    goToAddDeelnemer() {
        this.navCtrl.navigateForward(`${navigation.poules}/${navigation.adddeelnemer}`);

        // this.navCtrl.navigateForward(navigation.adddeelnemer, false, {relativeTo: this.route});
    }

    ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }

}
